import initSqlJs, { type Database, type SqlJsStatic } from "sql.js";
import wasmUrl from "sql.js/dist/sql-wasm.wasm?url";
import type { RunResult } from "@codecademy-clone/shared";

let sqlJsPromise: Promise<SqlJsStatic> | null = null;

function resolveWasmPath(): string {
  // Under Vitest (Node), the dev-server "/@fs/..." URL doesn't resolve over
  // HTTP, so fall back to the real filesystem path for a direct fs read.
  if (import.meta.env.MODE === "test") {
    return wasmUrl.replace(/^\/@fs/, "");
  }
  return wasmUrl;
}

function loadSqlJs(): Promise<SqlJsStatic> {
  if (!sqlJsPromise) {
    sqlJsPromise = initSqlJs({ locateFile: () => resolveWasmPath() });
  }
  return sqlJsPromise;
}

export class SqlRuntime {
  private SQL: SqlJsStatic | null = null;

  async init(): Promise<void> {
    this.SQL = await loadSqlJs();
  }

  get ready(): boolean {
    return this.SQL !== null;
  }

  /**
   * Runs setupSql against a fresh in-memory database, then runs userSql
   * against that same database. Every call starts from a clean database so
   * one run can never leak state into the next.
   */
  run(setupSql: string, userSql: string): RunResult {
    if (!this.SQL) {
      return { error: "SQL runtime not initialized yet." };
    }

    let db: Database | null = null;
    try {
      db = new this.SQL.Database();

      if (setupSql && setupSql.trim().length > 0) {
        db.run(setupSql);
      }

      const results = db.exec(userSql);

      if (results.length === 0) {
        return { columns: [], rows: [], error: null };
      }

      const last = results[results.length - 1];
      return { columns: last.columns, rows: last.values, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { error: message };
    } finally {
      db?.close();
    }
  }
}
