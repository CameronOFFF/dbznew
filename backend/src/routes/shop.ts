import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";
import { AuditAction } from "@prisma/client";
import { logAudit } from "../services/audit.js";

const router = Router();

router.get("/items", async (_req, res) => {
  const items = await prisma.item.findMany();
  res.json({ items });
});

router.post("/buy", requireAuth, async (req: AuthRequest, res) => {
  const { itemId } = req.body as { itemId: string };
  const item = await prisma.item.findUnique({ where: { id: itemId } });
  if (!item) {
    return res.status(404).json({ error: "Item não encontrado." });
  }

  await logAudit({
    userId: req.user?.id ?? "",
    action: AuditAction.TRANSACTION,
    context: "shop",
    metadata: { itemId }
  });

  return res.json({ message: "Compra registrada.", item });
});

export default router;
