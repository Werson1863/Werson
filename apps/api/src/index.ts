import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(cors({ origin: process.env.WEB_ORIGIN ?? "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
