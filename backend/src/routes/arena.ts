import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";
import { simulateAutoBattle } from "../services/combat.js";
import { logAudit } from "../services/audit.js";
import { detectSuspiciousActivity } from "../services/fraud.js";
import { AuditAction } from "@prisma/client";

const router = Router();

router.post("/attack", requireAuth, async (req: AuthRequest, res) => {
  const { targetPlayerId } = req.body as { targetPlayerId: string };
  const attacker = await prisma.player.findFirst({ where: { userId: req.user?.id } });
  const defender = await prisma.player.findUnique({ where: { id: targetPlayerId } });
  if (!attacker || !defender) {
    return res.status(404).json({ error: "Jogador não encontrado." });
  }

  const result = simulateAutoBattle(
    {
      name: attacker.name,
      strength: attacker.strength,
      defense: attacker.defense,
      agility: attacker.agility,
      speed: attacker.speed,
      critChance: attacker.critChance,
      critDamage: attacker.critDamage,
      hp: attacker.hp
    },
    {
      name: defender.name,
      strength: defender.strength,
      defense: defender.defense,
      agility: defender.agility,
      speed: defender.speed,
      critChance: defender.critChance,
      critDamage: defender.critDamage,
      hp: defender.hp
    }
  );

  await prisma.battleLog.create({
    data: {
      playerId: attacker.id,
      mode: "arena",
      summary: result
    }
  });

  await logAudit({
    userId: req.user?.id ?? "",
    action: AuditAction.PVP,
    context: "arena",
    metadata: { targetPlayerId, winner: result.winner }
  });

  const fraudCheck = detectSuspiciousActivity({
    action: "arena",
    payload: { targetPlayerId, repeatedAttacks: false }
  });

  return res.json({ result, fraudCheck });
});

router.get("/rank", async (_req, res) => {
  const ranking = await prisma.arenaProfile.findMany({
    take: 10,
    orderBy: { elo: "desc" },
    include: { player: true }
  });
  return res.json({ ranking });
});

export default router;
