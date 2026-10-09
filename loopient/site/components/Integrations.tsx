import { SectionHeader } from '@/components/SectionHeader';
import { copy } from '@/lib/content';

export function Integrations() {
  const s = copy.home.integrations;
  return (
    <section className="section-y bg-white" aria-labelledby="integraciok-cim">
      <div className="container-site">
        <SectionHeader id="integraciok-cim" eyebrow={s.eyebrow} title={s.title} lead={s.lead} align="center" />
        <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {s.items.map((name) => (
            <li key={name} className="flex min-h-16 items-center justify-center rounded-md bg-paper px-3 text-center text-[0.9375rem] font-semibold tracking-tight text-graphite shadow-ring break-anywhere">
              {name}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-sm text-subtle">{s.more}</p>
      </div>
    </section>
  );
}
