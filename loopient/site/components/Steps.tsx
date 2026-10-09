import { SectionHeader } from '@/components/SectionHeader';
import { copy } from '@/lib/content';

/** Számozott folyamat 01–03 („Tekt” szerkezet): nagy számok, felső vonal, eredmény-sor. */
export function Steps({ id = 'folyamat' }: { id?: string }) {
  const s = copy.home.process;
  return (
    <section id={id} className="section-y" aria-labelledby={`${id}-cim`}>
      <div className="container-site">
        <SectionHeader id={`${id}-cim`} eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
        <ol className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {s.steps.map((step) => (
            <li key={step.number} className="min-w-0 border-t-2 border-graphite pt-6">
              <span aria-hidden className="text-numeral block text-orange-deep tabular">
                {step.number}
              </span>
              <h3 className="text-h3 mt-6">
                <span className="sr-only">{step.number}. </span>
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
              <p className="mt-4 text-sm font-medium text-graphite">{step.result}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
