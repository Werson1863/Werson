import { Router } from "express";
import { z } from "zod";
import type { Progress } from "@prisma/client";
import { prisma } from "../db";
import { requireAuth, type AuthedRequest } from "../auth/middleware";

const router = Router();
router.use(requireAuth);

const progressUpdateSchema = z.object({
  status: z.enum(["not_started", "in_progress", "completed"]),
  lastCode: z.string().optional(),
});

function serializeProgress(row: Progress) {
  return {
    id: row.id,
    userId: row.userId,
    lessonId: row.lessonId,
    status: row.status,
    lastCode: row.lastCode,
    completedAt: row.completedAt ? row.completedAt.toISOString() : null,
    updatedAt: row.updatedAt.toISOString(),
  };
}

router.get("/", async (req: AuthedRequest, res) => {
  const rows = await prisma.progress.findMany({ where: { userId: req.userId! } });
  res.json(rows.map(serializeProgress));
});

router.put("/:lessonId", async (req: AuthedRequest, res) => {
  const parsed = progressUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message });
    return;
  }
  const { lessonId } = req.params;
  const { status, lastCode } = parsed.data;
  const userId = req.userId!;

  const row = await prisma.progress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: { status, lastCode, ...(status === "completed" ? { completedAt: new Date() } : {}) },
    create: {
      userId,
      lessonId,
      status,
      lastCode,
      completedAt: status === "completed" ? new Date() : null,
    },
  });
  res.json(serializeProgress(row));
});

export default router;
