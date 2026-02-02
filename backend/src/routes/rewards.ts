import { Router } from "express";
import { requireAuth, AuthRequest } from "../middleware/auth.js";

const router = Router();

router.get("/daily", requireAuth, async (_req: AuthRequest, res) => {
  res.json({
    streak: 4,
    todayReward: { zeni: 120, gemas: 1 },
    nextReset: "00:00 UTC"
  });
});

router.post("/daily/claim", requireAuth, async (_req: AuthRequest, res) => {
  res.json({ message: "Recompensa diária coletada." });
});

export default router;
