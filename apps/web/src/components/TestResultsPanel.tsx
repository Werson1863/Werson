import type { GradeResult } from "@codecademy-clone/shared";

export function TestResultsPanel({ grading }: { grading: GradeResult | null }) {
  if (!grading) return null;

  return (
    <div data-testid="test-results" className="border border-slate-800 rounded p-3 space-y-2">
      {grading.passed && (
        <p data-testid="lesson-completed" className="text-emerald-400 font-semibold">
          ✓ Lecke teljesítve
        </p>
      )}
      <ul className="space-y-1">
        {grading.results.map((r, i) => (
          <li key={i} className="text-sm">
            <div className={r.passed ? "text-emerald-400" : "text-red-400"}>
              {r.passed ? "✓" : "✗"} {r.description}
            </div>
            {!r.passed && <div className="text-slate-400 pl-5 whitespace-pre-wrap">{r.message}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
