import { SectionHeader } from '@/components/SectionHeader';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/lib/brand.generated';
import { copy } from '@/lib/content';

const ICONS: IconName[] = ['users', 'approval', 'security'];

/** Sötét „Alapelveink” szekció. */
export function Principles() {
  const s = copy.home.principles;
  return (
    <section className="on-dark relative overflow-hidden bg-graphite section-y text-white" aria-labelledby="alapelvek-cim">
      <div aria-hidden className="pattern-dark fade-radial pointer-events-none absolute inset-0" />
      <div className="container-site relative">
        <SectionHeader id="alapelvek-cim" eyebrow={s.eyebrow} title={s.title} tone="dark" />
        <ul className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {copy.brand.principles.map((p, i) => (
            <li key={p.title} className="flex min-w-0 flex-col rounded-lg bg-ink p-7 shadow-ring-dark">
              <div className="flex items-center justify-between">
                <span className="grid grid-cols-1 size-11 place-items-center rounded-[12px] bg-white/[0.06] text-orange-light">
                  <Icon name={ICONS[i]} size={22} />
                </span>
                <span className="text-sm font-semibold text-on-dark-muted tabular">0{i + 1}</span>
              </div>
              <h3 className="text-h3 mt-8 text-white">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-on-dark-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
