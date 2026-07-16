import { loadPyodide, type PyodideInterface } from "pyodide";
import type { PyProxy } from "pyodide/ffi";
import type { RunResult } from "@codecademy-clone/shared";

let pyodidePromise: Promise<PyodideInterface> | null = null;

function resolveIndexUrl(): string {
  // Under Vitest (Node), there is no dev server to serve "/pyodide/" over
  // HTTP, so load the runtime assets straight from node_modules instead.
  if (import.meta.env.MODE === "test") {
    return new URL("../../../../node_modules/pyodide/", import.meta.url).pathname;
  }
  return "/pyodide/";
}

function loadPyodideOnce(): Promise<PyodideInterface> {
  if (!pyodidePromise) {
    pyodidePromise = loadPyodide({ indexURL: resolveIndexUrl() });
  }
  return pyodidePromise;
}

function lastTracebackLine(raw: string): string {
  const lines = raw.trim().split("\n");
  return lines[lines.length - 1] || raw;
}

export class PythonRuntime {
  private pyodide: PyodideInterface | null = null;
  private namespace: PyProxy | null = null;

  async init(): Promise<void> {
    this.pyodide = await loadPyodideOnce();
  }

  get ready(): boolean {
    return this.pyodide !== null;
  }

  /**
   * Runs userCode against a fresh Python namespace every call, so state from
   * a previous run (variables, imports) never leaks into the next one.
   */
  async run(userCode: string): Promise<RunResult> {
    if (!this.pyodide) {
      return { error: "Python runtime not initialized yet." };
    }
    const pyodide = this.pyodide;

    this.namespace?.destroy();
    const namespace = pyodide.globals.get("dict")();
    this.namespace = namespace;

    let stdout = "";
    pyodide.setStdout({
      batched: (msg: string) => {
        stdout += msg + "\n";
      },
    });

    try {
      await pyodide.runPythonAsync(userCode, { globals: namespace });
      return { stdout: stdout.replace(/\n$/, ""), error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { stdout: stdout.replace(/\n$/, ""), error: lastTracebackLine(message) };
    }
  }

  /**
   * Calls a function the student defined during the most recent run(), for
   * function_returns grader tests. Must run() first so the function exists.
   */
  async callFunction(fn: string, args: unknown[]): Promise<unknown> {
    if (!this.pyodide || !this.namespace) {
      throw new Error("Futtasd a kódot, mielőtt a függvényt hívnánk.");
    }
    const target = this.namespace.get(fn);
    if (typeof target !== "function") {
      throw new Error(`A(z) ${fn} nevű függvény nincs definiálva.`);
    }
    const result = target(...args);
    if (result && typeof (result as PyProxy).toJs === "function") {
      const converted = (result as PyProxy).toJs();
      (result as PyProxy).destroy?.();
      return converted;
    }
    return result;
  }
}
