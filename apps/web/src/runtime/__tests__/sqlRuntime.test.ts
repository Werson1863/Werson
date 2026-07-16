import { describe, it, expect, beforeAll } from "vitest";
import { SqlRuntime } from "../sqlRuntime";

describe("SqlRuntime", () => {
  let runtime: SqlRuntime;

  beforeAll(async () => {
    runtime = new SqlRuntime();
    await runtime.init();
  });

  it("runs a simple arithmetic query", () => {
    const result = runtime.run("", "SELECT 1+1 AS x;");
    expect(result.error).toBeNull();
    expect(result.columns).toEqual(["x"]);
    expect(result.rows).toEqual([[2]]);
  });

  it("returns a readable error for invalid SQL", () => {
    const result = runtime.run("", "SELEKT * FROM nowhere;");
    expect(result.error).toBeTruthy();
    expect(result.columns).toBeUndefined();
  });

  it("runs setup before the user query, fresh each time", () => {
    const setup = "CREATE TABLE movies (title TEXT); INSERT INTO movies VALUES ('Inception');";
    const result = runtime.run(setup, "SELECT * FROM movies;");
    expect(result.error).toBeNull();
    expect(result.rows).toEqual([["Inception"]]);

    // Running again must not accumulate rows from a previous run.
    const second = runtime.run(setup, "SELECT * FROM movies;");
    expect(second.rows).toEqual([["Inception"]]);
  });
});
