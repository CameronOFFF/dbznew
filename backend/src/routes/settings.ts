import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";

const router = Router();

router.patch("/preferences", requireAuth, async (req: AuthRequest, res) => {
  const schema = z.object({
    language: z.string().optional(),
    theme: z.string().optional(),
    notifications: z.boolean().optional()
  });

  const data = schema.parse(req.body);
  const pref = await prisma.userPreference.update({
    where: { userId: req.user?.id },
    data
  });

  res.json({ preferences: pref });
});

router.post("/2fa/enable", requireAuth, async (req: AuthRequest, res) => {
  const { secret } = req.body as { secret: string };
  const pref = await prisma.userPreference.update({
    where: { userId: req.user?.id },
    data: { twoFactorSecret: secret }
  });
  res.json({ message: "2FA ativado.", preferences: pref });
});

router.post("/2fa/disable", requireAuth, async (req: AuthRequest, res) => {
  const pref = await prisma.userPreference.update({
    where: { userId: req.user?.id },
    data: { twoFactorSecret: null }
  });
  res.json({ message: "2FA desativado.", preferences: pref });
});

export default router;
