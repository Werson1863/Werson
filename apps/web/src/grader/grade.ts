import type { GradeResult, RunResult, TestCase, TestResult } from "@codecademy-clone/shared";

export interface GradeContext {
  /** The student's raw source code, used by regex_match tests with target "code". */
  code?: string;
  /** Calls a function the student defined, used by function_returns tests (Python only). */
  callFunction?: (fn: string, args: unknown[]) => Promise<unknown>;
}

function normalizeWhitespace(s: string): string {
  return s
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim().replace(/\s+/g, " "))
    .join("\n")
    .trim();
}

function stringifyOutput(result: RunResult): string {
  if (result.stdout !== undefined) {
    return result.stdout;
  }
  if (result.columns && result.rows) {
    const header = result.columns.join(" | ");
    const body = result.rows.map((row) => row.join(" | ")).join("\n");
    return [header, body].filter(Boolean).join("\n");
  }
  return "";
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    return a.length === b.length && a.every((v, i) => deepEqual(v, b[i]));
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const aKeys = Object.keys(a as object);
    const bKeys = Object.keys(b as object);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((k) => deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]));
  }
  return false;
}

async function runTest(result: RunResult, test: TestCase, context: GradeContext): Promise<TestResult> {
  const { description } = test;

  // regex_match against the source code doesn't need the run to have succeeded.
  if (test.type === "regex_match" && test.target === "code") {
    const code = context.code ?? "";
    const re = new RegExp(test.pattern);
    const passed = re.test(code);
    return {
      description,
      passed,
      message: passed ? "Megfelel a mintának." : `A kódnak illeszkednie kell erre a mintára: ${test.pattern}`,
    };
  }

  if (result.error) {
    return {
      description,
      passed: false,
      message: `A kód futtatása hibával állt le, ezért ez a teszt nem tud lefutni: ${result.error}`,
    };
  }

  switch (test.type) {
    case "output_match": {
      const actual = normalizeWhitespace(stringifyOutput(result));
      const expected = normalizeWhitespace(test.expected);
      const passed = actual === expected;
      return {
        description,
        passed,
        message: passed
          ? "A kimenet pontosan megegyezik az elvárttal."
          : `A kimenet nem egyezik. Elvárt:\n${expected}\n\nKapott:\n${actual}`,
      };
    }

    case "output_contains": {
      const actual = stringifyOutput(result);
      const missing = test.expected.filter((needle) => !actual.includes(needle));
      const passed = missing.length === 0;
      return {
        description,
        passed,
        message: passed
          ? "A kimenet tartalmazza az elvárt részleteket."
          : `A kimenetből hiányzik: ${missing.join(", ")}`,
      };
    }

    case "expected_row_count": {
      if (!result.rows) {
        return { description, passed: false, message: "Nincs SQL eredménytábla ehhez a lekérdezéshez." };
      }
      const passed = result.rows.length === test.count;
      return {
        description,
        passed,
        message: passed
          ? `Helyesen ${test.count} sort adott vissza.`
          : `${test.count} sort vártunk, de ${result.rows.length} érkezett. Ellenőrizd a WHERE/szűrési feltételeket.`,
      };
    }

    case "column_names": {
      if (!result.columns) {
        return { description, passed: false, message: "Nincs SQL eredménytábla ehhez a lekérdezéshez." };
      }
      const passed = deepEqual(result.columns, test.columns);
      return {
        description,
        passed,
        message: passed
          ? "Az oszlopnevek megfelelőek."
          : `Elvárt oszlopok: ${test.columns.join(", ")}. Kapott: ${result.columns.join(", ")}.`,
      };
    }

    case "regex_match": {
      const target = test.target === "code" ? (context.code ?? "") : stringifyOutput(result);
      const re = new RegExp(test.pattern);
      const passed = re.test(target);
      return {
        description,
        passed,
        message: passed ? "Megfelel a mintának." : `A kimenetnek illeszkednie kell erre a mintára: ${test.pattern}`,
      };
    }

    case "function_returns": {
      if (!context.callFunction) {
        return {
          description,
          passed: false,
          message: "A függvényhívás-teszt ebben a futtatókörnyezetben nem támogatott.",
        };
      }
      try {
        const actual = await context.callFunction(test.fn, test.args);
        const passed = deepEqual(actual, test.expected);
        return {
          description,
          passed,
          message: passed
            ? `${test.fn}(${test.args.map((a) => JSON.stringify(a)).join(", ")}) helyesen ${JSON.stringify(test.expected)}-t adott vissza.`
            : `${test.fn}(${test.args.map((a) => JSON.stringify(a)).join(", ")}) esetén ${JSON.stringify(test.expected)}-t vártunk, de ${JSON.stringify(actual)}-t kaptunk.`,
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return { description, passed: false, message: `Hiba a(z) ${test.fn} függvény hívásakor: ${message}` };
      }
    }
  }
}

export async function grade(result: RunResult, tests: TestCase[], context: GradeContext = {}): Promise<GradeResult> {
  const results: TestResult[] = [];
  for (const test of tests) {
    results.push(await runTest(result, test, context));
  }
  return { passed: results.every((r) => r.passed), results };
}
