import { Router } from "express";
import { requireAuth, AuthRequest } from "../middleware/auth.js";

const router = Router();

router.post("/start", requireAuth, async (req: AuthRequest, res) => {
  const { durationMinutes } = req.body as { durationMinutes: number };
  const startedAt = new Date();
  const endsAt = new Date(startedAt.getTime() + durationMinutes * 60000);
  return res.json({
    message: "Treino iniciado.",
    startedAt,
    endsAt,
    rewardPreview: { xp: durationMinutes * 5 }
  });
});

router.post("/cancel", requireAuth, async (_req: AuthRequest, res) => {
  return res.json({ message: "Treino cancelado." });
});

router.get("/status", requireAuth, async (_req: AuthRequest, res) => {
  return res.json({ status: "idle" });
});

export default router;
