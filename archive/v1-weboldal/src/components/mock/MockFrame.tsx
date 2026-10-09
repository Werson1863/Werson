import type { ReactNode } from "react";

/** Közös keret a díszítő mock-UI kártyákhoz. */
export function MockFrame({
  title,
  meta,
  badge,
  children,
  className = "",
}: {
  title: string;
  meta?: ReactNode;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-[1.25rem] bg-white text-left shadow-[var(--shadow-raised)] ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-graphite/[0.06] px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="hidden gap-1.5 sm:flex" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-graphite/10" />
            <span className="size-2.5 rounded-full bg-graphite/10" />
            <span className="size-2.5 rounded-full bg-graphite/10" />
          </span>
          <div className="min-w-0 break-words">
            <p className="text-sm font-semibold leading-snug">{title}</p>
            {meta && <p className="text-xs text-muted">{meta}</p>}
          </div>
        </div>
        {badge}
      </div>
      {children}
    </div>
  );
}

export function StatusPill({ tone = "done", children }: { tone?: "done" | "wait" | "info"; children: ReactNode }) {
  const tones = {
    done: "bg-emerald-50 text-emerald-800",
    wait: "bg-orange-wash text-orange-ink",
    info: "bg-mist text-muted",
  } as const;
  return (
    <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}
