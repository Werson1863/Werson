export function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-slate-400">
        <span>Haladás</span>
        <span data-testid="progress-label">
          {completed} / {total} lecke ({pct}%)
        </span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          data-testid="progress-bar-fill"
          className="h-full bg-emerald-600 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
