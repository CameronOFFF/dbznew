import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { createServer } from "http";
import { Server } from "socket.io";
import { env } from "./config/env.js";
import authRoutes from "./routes/auth.js";
import playerRoutes from "./routes/player.js";
import questRoutes from "./routes/quests.js";
import arenaRoutes from "./routes/arena.js";
import shopRoutes from "./routes/shop.js";
import clanRoutes from "./routes/clan.js";
import adminRoutes from "./routes/admin.js";
import uploadRoutes from "./routes/upload.js";
import trainingRoutes from "./routes/training.js";
import sagaRoutes from "./routes/sagas.js";
import tournamentRoutes from "./routes/tournament.js";
import eventRoutes from "./routes/events.js";
import rewardRoutes from "./routes/rewards.js";
import inventoryRoutes from "./routes/inventory.js";
import settingsRoutes from "./routes/settings.js";
import { errorHandler } from "./middleware/error.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.corsOrigin,
    credentials: true
  }
});

app.use(helmet());
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(rateLimit({ windowMs: 60_000, max: 120 }));
app.use("/uploads", express.static(env.storageLocalPath));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/player", playerRoutes);
app.use("/quests", questRoutes);
app.use("/arena", arenaRoutes);
app.use("/shop", shopRoutes);
app.use("/clan", clanRoutes);
app.use("/admin", adminRoutes);
app.use("/upload", uploadRoutes);
app.use("/training", trainingRoutes);
app.use("/sagas", sagaRoutes);
app.use("/tournament", tournamentRoutes);
app.use("/events", eventRoutes);
app.use("/rewards", rewardRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/settings", settingsRoutes);

io.on("connection", (socket) => {
  socket.on("chat:global", (payload) => {
    io.emit("chat:global", payload);
  });
  socket.on("chat:clan", (payload) => {
    io.emit("chat:clan", payload);
  });
});

app.use(errorHandler);

server.listen(env.port, () => {
  console.log(`Backend pronto em http://localhost:${env.port}`);
});
