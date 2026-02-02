import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/challenges", async (_req, res) => {
  const challenges = await prisma.challenge.findMany();
  res.json({ challenges });
});

router.get("/season", async (_req, res) => {
  res.json({
    season: 3,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 48),
    event: "Festival Prisma"
  });
});

export default router;
