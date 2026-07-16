import "dotenv/config";
import argon2 from "argon2";
import { prisma } from "./db";

const DEMO_EMAIL = "demo@codelearn.dev";
const DEMO_PASSWORD = "demopassword123";

const seedProgress: Array<{ lessonId: string; status: string; lastCode: string; completed: boolean }> = [
  { lessonId: "sql-basics/01-select", status: "completed", lastCode: "SELECT * FROM movies;", completed: true },
  {
    lessonId: "sql-basics/02-where",
    status: "in_progress",
    lastCode: "-- Kérdezd le a 2010 után készült filmeket\nSELECT * FROM movies WHERE",
    completed: false,
  },
  { lessonId: "python-basics/01-print", status: "completed", lastCode: 'print("hello")', completed: true },
];

async function main() {
  const passwordHash = await argon2.hash(DEMO_PASSWORD);
  const user = await prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: {},
    create: { email: DEMO_EMAIL, passwordHash },
  });

  for (const p of seedProgress) {
    await prisma.progress.upsert({
      where: { userId_lessonId: { userId: user.id, lessonId: p.lessonId } },
      update: { status: p.status, lastCode: p.lastCode, completedAt: p.completed ? new Date() : null },
      create: {
        userId: user.id,
        lessonId: p.lessonId,
        status: p.status,
        lastCode: p.lastCode,
        completedAt: p.completed ? new Date() : null,
      },
    });
  }

  const courseCount = new Set(seedProgress.map((p) => p.lessonId.split("/")[0])).size;
  console.log(`Seeded demo user: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);
  console.log(`Seeded progress across ${courseCount} courses (${seedProgress.length} lessons).`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
