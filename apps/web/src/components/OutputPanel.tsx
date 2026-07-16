import type { RunResult } from "@codecademy-clone/shared";

export function OutputPanel({ result, running }: { result: RunResult | null; running: boolean }) {
  if (running) {
    return <p className="text-slate-400 text-sm">Futtatás...</p>;
  }

  if (!result) {
    return <p className="text-slate-500 text-sm">Nyomd meg a Run gombot a kód futtatásához.</p>;
  }

  if (result.error) {
    return (
      <pre
        data-testid="run-error"
        className="text-red-400 text-sm whitespace-pre-wrap bg-red-950/40 border border-red-900 rounded p-3"
      >
        {result.error}
      </pre>
    );
  }

  if (result.stdout !== undefined) {
    return (
      <pre data-testid="run-stdout" className="text-slate-200 text-sm whitespace-pre-wrap bg-slate-900 rounded p-3">
        {result.stdout || "(nincs kimenet)"}
      </pre>
    );
  }

  if (result.columns && result.rows) {
    if (result.columns.length === 0) {
      return <p className="text-slate-400 text-sm">A lekérdezés lefutott, de nem adott vissza sorokat.</p>;
    }
    return (
      <div className="overflow-auto">
        <table data-testid="run-table" className="border-collapse w-full text-sm">
          <thead>
            <tr>
              {result.columns.map((c) => (
                <th key={c} className="border border-slate-700 px-2 py-1 bg-slate-800 text-left">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="border border-slate-700 px-2 py-1">
                    {String(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}
