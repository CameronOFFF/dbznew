import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";

const router = Router();

router.post("/create", requireAuth, async (req: AuthRequest, res) => {
  const { name, motto } = req.body as { name: string; motto?: string };
  const existing = await prisma.clan.findUnique({ where: { name } });
  if (existing) {
    return res.status(409).json({ error: "Nome já usado." });
  }

  const player = await prisma.player.findFirst({ where: { userId: req.user?.id } });
  if (!player) {
    return res.status(400).json({ error: "Crie um personagem primeiro." });
  }

  const clan = await prisma.clan.create({
    data: {
      name,
      motto,
      members: { create: { playerId: player.id, role: "LEADER" } }
    }
  });

  return res.status(201).json({ clan });
});

router.post("/invite", requireAuth, async (req: AuthRequest, res) => {
  const { playerId } = req.body as { playerId: string };
  return res.json({ message: "Convite enviado.", playerId });
});

export default router;
