import { Router } from "express";
import type { CookieOptions } from "express";
import argon2 from "argon2";
import { z } from "zod";
import type { User } from "@prisma/client";
import { prisma } from "../db";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "./tokens";
import { requireAuth, type AuthedRequest } from "./middleware";

const router = Router();

const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email("Érvénytelen e-mail cím."),
  password: z.string().min(8, "A jelszónak legalább 8 karakter hosszúnak kell lennie."),
});

const REFRESH_COOKIE = "refreshToken";
const REFRESH_COOKIE_OPTS: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function toPublicUser(user: User) {
  return { id: user.id, email: user.email, createdAt: user.createdAt.toISOString() };
}

router.post("/register", async (req, res) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message });
    return;
  }
  const { email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    res.status(409).json({ error: "Ez az e-mail cím már regisztrálva van." });
    return;
  }

  const passwordHash = await argon2.hash(password);
  const user = await prisma.user.create({ data: { email, passwordHash } });

  const accessToken = signAccessToken(user.id);
  res.cookie(REFRESH_COOKIE, signRefreshToken(user.id), REFRESH_COOKIE_OPTS);
  res.status(201).json({ accessToken, user: toPublicUser(user) });
});

router.post("/login", async (req, res) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message });
    return;
  }
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await argon2.verify(user.passwordHash, password))) {
    res.status(401).json({ error: "Hibás e-mail cím vagy jelszó." });
    return;
  }

  const accessToken = signAccessToken(user.id);
  res.cookie(REFRESH_COOKIE, signRefreshToken(user.id), REFRESH_COOKIE_OPTS);
  res.json({ accessToken, user: toPublicUser(user) });
});

router.post("/refresh", async (req, res) => {
  const token = req.cookies?.[REFRESH_COOKIE];
  if (!token) {
    res.status(401).json({ error: "Nincs érvényes munkamenet." });
    return;
  }
  try {
    const payload = verifyRefreshToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      res.status(401).json({ error: "Nincs érvényes munkamenet." });
      return;
    }
    const accessToken = signAccessToken(user.id);
    res.cookie(REFRESH_COOKIE, signRefreshToken(user.id), REFRESH_COOKIE_OPTS);
    res.json({ accessToken, user: toPublicUser(user) });
  } catch {
    res.status(401).json({ error: "Érvénytelen vagy lejárt munkamenet." });
  }
});

router.post("/logout", (_req, res) => {
  res.clearCookie(REFRESH_COOKIE, { path: "/" });
  res.status(204).end();
});

router.get("/me", requireAuth, async (req: AuthedRequest, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId! } });
  if (!user) {
    res.status(404).json({ error: "Felhasználó nem található." });
    return;
  }
  res.json(toPublicUser(user));
});

export default router;
