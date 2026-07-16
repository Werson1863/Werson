// @vitest-environment node
import { describe, it, expect, beforeAll } from "vitest";
import { PythonRuntime } from "../pythonRuntime";

describe("PythonRuntime", () => {
  let runtime: PythonRuntime;

  beforeAll(async () => {
    runtime = new PythonRuntime();
    await runtime.init();
  }, 30000);

  it("captures stdout from print()", async () => {
    const result = await runtime.run('print("hello")');
    expect(result.error).toBeNull();
    expect(result.stdout).toBe("hello");
  });

  it("returns a readable error for invalid Python", async () => {
    const result = await runtime.run("def broken(:\n    pass");
    expect(result.error).toBeTruthy();
  });

  it("starts each run from a fresh namespace", async () => {
    const first = await runtime.run("x = 42");
    expect(first.error).toBeNull();

    const second = await runtime.run("print(x)");
    expect(second.error).toBeTruthy();
  });

  it("calls a student-defined function for function_returns tests", async () => {
    await runtime.run("def double(n):\n    return n * 2");
    const value = await runtime.callFunction("double", [21]);
    expect(value).toBe(42);
  });
});
