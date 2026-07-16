import { describe, it, expect, beforeAll } from "vitest";
import { getAllCourses, getLesson } from "../loader";
import { SqlRuntime } from "../../runtime/sqlRuntime";
import { grade } from "../../grader/grade";

describe("content self-test (SQL lessons)", () => {
  let runtime: SqlRuntime;

  beforeAll(async () => {
    runtime = new SqlRuntime();
    await runtime.init();
  });

  const sqlLessonIds = getAllCourses()
    .filter((c) => c.runtime === "sql")
    .flatMap((c) => c.lessons.map((l) => l.id));

  it.each(sqlLessonIds)("%s: solution passes every hidden test", async (lessonId) => {
    const lesson = getLesson(lessonId)!;
    const result = runtime.run(lesson.setup ?? "", lesson.solution);
    const g = await grade(result, lesson.tests, { code: lesson.solution });
    if (!g.passed) {
      throw new Error(
        `Solution for ${lessonId} failed: ${g.results
          .filter((r) => !r.passed)
          .map((r) => r.message)
          .join("; ")}`,
      );
    }
    expect(g.passed).toBe(true);
  });

  it.each(sqlLessonIds)("%s: starter code does not already pass", async (lessonId) => {
    const lesson = getLesson(lessonId)!;
    if (lesson.starterCode.trim() === lesson.solution.trim()) {
      // Starter code intentionally equals the solution (rare) — skip.
      return;
    }
    const result = runtime.run(lesson.setup ?? "", lesson.starterCode);
    const g = await grade(result, lesson.tests, { code: lesson.starterCode });
    expect(g.passed).toBe(false);
  });
});
