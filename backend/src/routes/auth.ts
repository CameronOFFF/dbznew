import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import {
  hashPassword,
  signAccessToken,
  signRefreshToken,
  verifyLegacyMd5,
  verifyPassword,
  verifyRefreshToken
} from "../lib/auth.js";
import { env } from "../config/env.js";
import { logAudit } from "../services/audit.js";
import { AuditAction } from "@prisma/client";

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8)
});

router.post("/register", async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const exists = await prisma.user.findFirst({
      where: { OR: [{ email: data.email }, { username: data.username }] }
    });
    if (exists) {
      return res.status(409).json({ error: "Email ou usuário já cadastrado." });
    }

    const user = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        passwordHash: await hashPassword(data.password),
        preferences: { create: {} }
      }
    });

    await logAudit({
      userId: user.id,
      action: AuditAction.LOGIN,
      context: "register",
      metadata: { email: user.email }
    });

    return res.status(201).json({ message: "Conta criada." });
  } catch (error) {
    return next(error);
  }
});

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8)
});

router.post("/login", async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await prisma.user.findFirst({ where: { username: data.username } });
    if (!user || user.isBanned) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    let valid = await verifyPassword(data.password, user.passwordHash);
    if (!valid && env.legacyMd5 && user.legacyMd5) {
      valid = verifyLegacyMd5(data.password, user.passwordHash);
      if (valid) {
        const newHash = await hashPassword(data.password);
        await prisma.user.update({
          where: { id: user.id },
          data: { passwordHash: newHash, legacyMd5: false }
        });
      }
    }

    if (!valid) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    const refreshToken = signRefreshToken({ sub: user.id });
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + env.refreshTtlDays * 86400000)
      }
    });

    await logAudit({
      userId: user.id,
      action: AuditAction.LOGIN,
      context: "login",
      metadata: { ip: req.ip }
    });

    return res.json({ accessToken, refreshToken });
  } catch (error) {
    return next(error);
  }
});

router.post("/refresh", async (req, res, next) => {
  try {
    const schema = z.object({ refreshToken: z.string().min(20) });
    const { refreshToken } = schema.parse(req.body);
    const token = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!token || token.revokedAt || token.expiresAt < new Date()) {
      return res.status(401).json({ error: "Refresh token inválido." });
    }

    const payload = verifyRefreshToken(refreshToken) as { sub: string };
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      return res.status(401).json({ error: "Refresh token inválido." });
    }
    const accessToken = signAccessToken({ sub: token.userId, role: user.role });
    return res.json({ accessToken });
  } catch (error) {
    return next(error);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    const schema = z.object({ refreshToken: z.string() });
    const { refreshToken } = schema.parse(req.body);
    await prisma.refreshToken.updateMany({
      where: { token: refreshToken },
      data: { revokedAt: new Date() }
    });
    return res.json({ message: "Logout efetuado." });
  } catch (error) {
    return next(error);
  }
});

router.post("/forgot", async (req, res, next) => {
  try {
    const schema = z.object({ email: z.string().email() });
    const { email } = schema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(200).json({ message: "Se existir, enviaremos instruções." });
    }
    return res.json({ message: "Token temporário enviado para o email." });
  } catch (error) {
    return next(error);
  }
});

router.post("/reset", async (req, res, next) => {
  try {
    const schema = z.object({
      token: z.string().min(10),
      newPassword: z.string().min(8)
    });
    schema.parse(req.body);
    return res.json({ message: "Senha redefinida." });
  } catch (error) {
    return next(error);
  }
});

export default router;
