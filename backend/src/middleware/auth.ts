import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/auth.js";

export type AuthRequest = Request & { user?: { id: string; role: string } };

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token ausente." });
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const payload = verifyAccessToken(token) as { sub: string; role: string };
    req.user = { id: payload.sub, role: payload.role };
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido." });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({ error: "Acesso negado." });
  }
  return next();
};
