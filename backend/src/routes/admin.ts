import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { logAudit } from "../services/audit.js";
import { AuditAction } from "@prisma/client";

const router = Router();

router.use(requireAuth, requireAdmin);

router.get("/users", async (_req, res) => {
  const users = await prisma.user.findMany({ include: { player: true } });
  res.json({ users });
});

router.patch("/users/:id/ban", async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: { isBanned: true }
  });

  await logAudit({
    userId: req.params.id,
    action: AuditAction.ADMIN,
    context: "ban",
    metadata: { adminAction: "ban" }
  });

  res.json({ user });
});

router.get("/logs", async (req, res) => {
  const { userId, from, to } = req.query as {
    userId?: string;
    from?: string;
    to?: string;
  };

  const logs = await prisma.auditLog.findMany({
    where: {
      userId: userId ?? undefined,
      createdAt: {
        gte: from ? new Date(from) : undefined,
        lte: to ? new Date(to) : undefined
      }
    },
    orderBy: { createdAt: "desc" }
  });

  res.json({ logs });
});

export default router;
