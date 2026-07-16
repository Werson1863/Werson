// @vitest-environment node
import { describe, it, expect, beforeAll } from "vitest";
import { getAllCourses, getLesson } from "../loader";
import { PythonRuntime } from "../../runtime/pythonRuntime";
import { grade } from "../../grader/grade";

describe("content self-test (Python lessons)", () => {
  let runtime: PythonRuntime;

  beforeAll(async () => {
    runtime = new PythonRuntime();
    await runtime.init();
  }, 30000);

  const pythonLessonIds = getAllCourses()
    .filter((c) => c.runtime === "python")
    .flatMap((c) => c.lessons.map((l) => l.id));

  it.each(pythonLessonIds)(
    "%s: solution passes every hidden test",
    async (lessonId) => {
      const lesson = getLesson(lessonId)!;
      const result = await runtime.run(lesson.solution);
      const g = await grade(result, lesson.tests, {
        code: lesson.solution,
        callFunction: (fn, args) => runtime.callFunction(fn, args),
      });
      if (!g.passed) {
        throw new Error(
          `Solution for ${lessonId} failed: ${g.results
            .filter((r) => !r.passed)
            .map((r) => r.message)
            .join("; ")}`,
        );
      }
      expect(g.passed).toBe(true);
    },
    15000,
  );

  it.each(pythonLessonIds)(
    "%s: starter code does not already pass",
    async (lessonId) => {
      const lesson = getLesson(lessonId)!;
      if (lesson.starterCode.trim() === lesson.solution.trim()) {
        return;
      }
      const result = await runtime.run(lesson.starterCode);
      const g = await grade(result, lesson.tests, {
        code: lesson.starterCode,
        callFunction: (fn, args) => runtime.callFunction(fn, args),
      });
      expect(g.passed).toBe(false);
    },
    15000,
  );
});
