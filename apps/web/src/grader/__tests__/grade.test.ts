import { describe, it, expect } from "vitest";
import { grade } from "../grade";
import type { RunResult } from "@codecademy-clone/shared";

describe("grade", () => {
  it("passes output_match on normalized-whitespace-equal stdout", async () => {
    const result: RunResult = { stdout: "  hello world  \n", error: null };
    const g = await grade(result, [{ type: "output_match", description: "prints hello world", expected: "hello world" }]);
    expect(g.passed).toBe(true);
  });

  it("fails output_match when content differs", async () => {
    const result: RunResult = { stdout: "goodbye", error: null };
    const g = await grade(result, [{ type: "output_match", description: "prints hello", expected: "hello" }]);
    expect(g.passed).toBe(false);
    expect(g.results[0].message).toMatch(/nem egyezik/i);
  });

  it("passes output_contains when all needles are present", async () => {
    const result: RunResult = { columns: ["title"], rows: [["Inception"], ["The Matrix"]], error: null };
    const g = await grade(result, [
      { type: "output_contains", description: "has Inception", expected: ["Inception"] },
    ]);
    expect(g.passed).toBe(true);
  });

  it("fails output_contains and reports the missing needle", async () => {
    const result: RunResult = { columns: ["title"], rows: [["The Matrix"]], error: null };
    const g = await grade(result, [
      { type: "output_contains", description: "has Inception", expected: ["Inception"] },
    ]);
    expect(g.passed).toBe(false);
    expect(g.results[0].message).toContain("Inception");
  });

  it("checks expected_row_count against SQL rows", async () => {
    const result: RunResult = { columns: ["id"], rows: [[1], [2], [3]], error: null };
    const ok = await grade(result, [{ type: "expected_row_count", description: "3 rows", count: 3 }]);
    expect(ok.passed).toBe(true);

    const bad = await grade(result, [{ type: "expected_row_count", description: "5 rows", count: 5 }]);
    expect(bad.passed).toBe(false);
  });

  it("checks column_names order and content", async () => {
    const result: RunResult = { columns: ["id", "title"], rows: [], error: null };
    const ok = await grade(result, [{ type: "column_names", description: "cols", columns: ["id", "title"] }]);
    expect(ok.passed).toBe(true);

    const bad = await grade(result, [{ type: "column_names", description: "cols", columns: ["title", "id"] }]);
    expect(bad.passed).toBe(false);
  });

  it("matches regex_match against code without requiring a successful run", async () => {
    const result: RunResult = { error: "irrelevant, should not block code-based regex" };
    const g = await grade(result, [{ type: "regex_match", description: "uses a function", pattern: "def\\s+\\w+", target: "code" }], {
      code: "def solve(x):\n    return x",
    });
    expect(g.passed).toBe(true);
  });

  it("fails every non-code test when the run errored", async () => {
    const result: RunResult = { error: "syntax error" };
    const g = await grade(result, [{ type: "expected_row_count", description: "3 rows", count: 3 }]);
    expect(g.passed).toBe(false);
    expect(g.results[0].message).toContain("syntax error");
  });

  it("calls the provided callFunction for function_returns tests", async () => {
    const result: RunResult = { stdout: "", error: null };
    const g = await grade(
      result,
      [{ type: "function_returns", description: "doubles the input", fn: "double", args: [3], expected: 6 }],
      { callFunction: async (fn, args) => (fn === "double" ? (args[0] as number) * 2 : undefined) },
    );
    expect(g.passed).toBe(true);
  });

  it("fails function_returns with a clear message when unsupported", async () => {
    const result: RunResult = { stdout: "", error: null };
    const g = await grade(result, [
      { type: "function_returns", description: "doubles the input", fn: "double", args: [3], expected: 6 },
    ]);
    expect(g.passed).toBe(false);
    expect(g.results[0].message).toMatch(/nem támogatott/i);
  });
});
