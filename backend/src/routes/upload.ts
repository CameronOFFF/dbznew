import { Router } from "express";
import multer from "multer";
import { env } from "../config/env.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
const upload = multer({ dest: env.storageLocalPath });

router.post("/image", requireAuth, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Arquivo obrigatório." });
  }

  if (env.storageDriver !== "local") {
    return res.status(501).json({ error: "S3 compatível não configurado ainda." });
  }

  return res.json({
    url: `/uploads/${req.file.filename}`,
    driver: env.storageDriver
  });
});

export default router;
