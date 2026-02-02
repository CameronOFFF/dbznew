import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";

const router = Router();

router.get("/me", requireAuth, async (req: AuthRequest, res) => {
  const player = await prisma.player.findFirst({
    where: { userId: req.user?.id },
    include: { raceClass: true, clanMember: true }
  });
  return res.json({ player });
});

router.post("/create", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const schema = z.object({
      name: z.string().min(3),
      avatarUrl: z.string().url().optional(),
      raceClassId: z.string().uuid(),
      stats: z.object({
        strength: z.number().min(0),
        defense: z.number().min(0),
        resilience: z.number().min(0),
        agility: z.number().min(0),
        speed: z.number().min(0)
      })
    });

    const data = schema.parse(req.body);
    const exists = await prisma.player.findFirst({ where: { userId: req.user?.id } });
    if (exists) {
      return res.status(409).json({ error: "Personagem já existe." });
    }

    const race = await prisma.raceClass.findUnique({ where: { id: data.raceClassId } });
    if (!race) {
      return res.status(404).json({ error: "Raça/classe inválida." });
    }

    const player = await prisma.player.create({
      data: {
        userId: req.user?.id ?? "",
        name: data.name,
        avatarUrl: data.avatarUrl,
        raceClassId: data.raceClassId,
        strength: race.baseStrength + data.stats.strength,
        defense: race.baseDefense + data.stats.defense,
        resilience: race.baseResilience + data.stats.resilience,
        agility: race.baseAgility + data.stats.agility,
        speed: race.baseSpeed + data.stats.speed,
        energy: race.baseEnergy
      }
    });

    return res.status(201).json({ player });
  } catch (error) {
    return next(error);
  }
});

router.get("/stats", requireAuth, async (req: AuthRequest, res) => {
  const player = await prisma.player.findFirst({ where: { userId: req.user?.id } });
  return res.json({ stats: player });
});

router.get("/equip", requireAuth, async (req: AuthRequest, res) => {
  const equipment = await prisma.equipmentSlot.findMany({
    where: { player: { userId: req.user?.id } },
    include: { item: true }
  });
  return res.json({ equipment });
});

export default router;
