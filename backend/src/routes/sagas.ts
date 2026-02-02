import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, async (_req: AuthRequest, res) => {
  const chapters = await prisma.sagaChapter.findMany();
  res.json({ chapters });
});

router.post("/start", requireAuth, async (req: AuthRequest, res) => {
  const { chapterId } = req.body as { chapterId: string };
  return res.json({ message: "Capítulo iniciado.", chapterId });
});

export default router;
