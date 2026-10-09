import { brand } from '@/lib/brand.generated';

const COLORS = {
  light: { b1: '#F97316', b2: '#C2410C', text: '#0F1115', tag: '#4B5160' },
  dark: { b1: '#F97316', b2: '#FDBA74', text: '#FFFFFF', tag: '#A9AEBB' },
} as const;

const [mx0, my0, mx1, my1] = brand.markBox;
const MARK_H = my1 - my0;

/** Vízszintes lockup (jel + LOOPIENT + BUSINESS AUTOMATION) – a kötött geometriából. */
export function Logo({ variant = 'light', className, tagline = true }: { variant?: 'light' | 'dark'; className?: string; tagline?: boolean }) {
  const c = COLORS[variant];
  const h = brand.horizontal;
  const s = h.markHeight / MARK_H;
  const height = tagline ? h.height : h.textY + brand.wordmark.cap + 4;
  return (
    <svg viewBox={`-2 -2 ${h.width + 4} ${height + 4}`} className={className} role="img" aria-label="Loopient – Business automation" focusable="false">
      <g transform={`translate(${-mx0 * s} ${-my0 * s}) scale(${s})`}>
        <path d={brand.blade1} fill={c.b1} />
        <path d={brand.blade2} fill={c.b2} />
      </g>
      <g transform={`translate(${h.textX} ${h.textY})`}>
        <path d={brand.wordmark.d} fill={c.text} />
        {tagline && <path d={brand.wordmark.tagline} fill={c.tag} />}
      </g>
    </svg>
  );
}

/** Csak a jel. */
export function Mark({ variant = 'light', className, title }: { variant?: 'light' | 'dark' | 'mono'; className?: string; title?: string }) {
  const c = variant === 'mono' ? { b1: 'currentColor', b2: 'currentColor' } : COLORS[variant];
  return (
    <svg
      viewBox={`${mx0} ${my0} ${mx1 - mx0} ${MARK_H}`}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d={brand.blade1} fill={c.b1} />
      <path d={brand.blade2} fill={c.b2} />
    </svg>
  );
}
