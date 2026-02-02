import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, async (req: AuthRequest, res) => {
  const inventory = await prisma.inventoryItem.findMany({
    where: { player: { userId: req.user?.id } },
    include: { item: true }
  });
  res.json({ inventory });
});

router.post("/craft", requireAuth, async (req: AuthRequest, res) => {
  const { recipe } = req.body as { recipe: string };
  res.json({ message: "Crafting iniciado.", recipe });
});

export default router;
