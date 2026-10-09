import { cx } from '@/lib/cx';
import { Mark } from '@/components/Logo';

/** Mock-UI kártya-keret: az oldal termékszerű illusztrációi. Példa adatokat mutat, nem állításokat. */
export function MockCard({
  title,
  badge,
  meta,
  children,
  className,
}: {
  title: string;
  badge?: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx('card overflow-hidden text-left', className)}>
      <div className="flex items-center gap-3 border-b border-graphite/[0.06] px-5 py-4">
        <span className="grid grid-cols-1 size-8 shrink-0 place-items-center rounded-[9px] bg-graphite">
          <Mark variant="dark" className="h-4 w-auto" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.9375rem] font-semibold tracking-tight">{title}</p>
          {meta && <p className="truncate text-xs text-subtle tabular">{meta}</p>}
        </div>
        {badge && <span className="pill pill-neutral">{badge}</span>}
      </div>
      {children}
    </div>
  );
}

export function StatusPill({ tone, children }: { tone: string; children: React.ReactNode }) {
  return (
    <span className={cx('pill', tone === 'wait' ? 'pill-wait' : 'pill-done')}>
      {tone === 'wait' && <span aria-hidden className="size-1.5 rounded-full bg-orange [animation:pulse-dot_1.8s_var(--lp-ease)_infinite]" />}
      {children}
    </span>
  );
}
