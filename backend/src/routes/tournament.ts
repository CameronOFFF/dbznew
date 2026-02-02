import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_req, res) => {
  const tournaments = await prisma.tournament.findMany({ orderBy: { scheduledAt: "asc" } });
  res.json({ tournaments });
});

router.post("/join", requireAuth, async (req: AuthRequest, res) => {
  const { tournamentId } = req.body as { tournamentId: string };
  res.json({ message: "Inscrição registrada.", tournamentId });
});

export default router;
