import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, async (req: AuthRequest, res) => {
  const quests = await prisma.quest.findMany();
  const progress = await prisma.playerQuest.findMany({
    where: { player: { userId: req.user?.id } },
    include: { quest: true }
  });
  return res.json({ quests, progress });
});

router.post("/claim", requireAuth, async (req: AuthRequest, res) => {
  const { questId } = req.body as { questId: string };
  const quest = await prisma.playerQuest.findFirst({
    where: { questId, player: { userId: req.user?.id } },
    include: { quest: true }
  });
  if (!quest || !quest.completed) {
    return res.status(400).json({ error: "Quest incompleta." });
  }
  return res.json({ message: "Recompensa entregue.", rewards: quest.quest.rewards });
});

export default router;
