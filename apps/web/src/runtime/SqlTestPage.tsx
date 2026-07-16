import { useEffect, useRef, useState } from "react";
import { SqlRuntime } from "./sqlRuntime";
import type { RunResult } from "@codecademy-clone/shared";

export function SqlTestPage() {
  const runtimeRef = useRef<SqlRuntime | null>(null);
  const [ready, setReady] = useState(false);
  const [code, setCode] = useState("SELECT 1+1 AS x;");
  const [result, setResult] = useState<RunResult | null>(null);

  useEffect(() => {
    const runtime = new SqlRuntime();
    runtimeRef.current = runtime;
    runtime.init().then(() => setReady(true));
  }, []);

  const onRun = () => {
    if (!runtimeRef.current) return;
    setResult(runtimeRef.current.run("", code));
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">SQL Runtime Test</h2>
      <p>Runtime status: {ready ? "ready" : "loading..."}</p>
      <textarea
        data-testid="sql-input"
        className="w-full border p-2 font-mono text-sm text-black"
        rows={4}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        data-testid="run-button"
        onClick={onRun}
        disabled={!ready}
        className="px-4 py-2 bg-emerald-600 text-white rounded disabled:opacity-50"
      >
        Run
      </button>
      {result?.error && (
        <p data-testid="sql-error" className="text-red-500">
          Error: {result.error}
        </p>
      )}
      {result && !result.error && (
        <table data-testid="sql-result" className="border-collapse">
          <thead>
            <tr>
              {result.columns?.map((c) => (
                <th key={c} className="border px-2">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows?.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="border px-2">
                    {String(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
