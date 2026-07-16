import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import authRoutes from "./auth/routes";
import progressRoutes from "./progress/routes";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(cors({ origin: process.env.WEB_ORIGIN ?? "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// Only rate-limit the credential-guessing endpoints (register/login); token
// refresh, logout and /me aren't brute-force targets and stay unrestricted.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/auth/register", authLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
