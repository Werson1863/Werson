import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { Icon } from '@/components/Icon';
import { Rich } from '@/components/Rich';
import { Steps } from '@/components/Steps';
import { CtaBand } from '@/components/CtaBand';
import type { IconName } from '@/lib/brand.generated';
import { copy } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { cx } from '@/lib/cx';

export const metadata = pageMetadata('solutions', '/megoldasok');

export default function SolutionsPage() {
  const s = copy.solutions;
  return (
    <>
      <PageHero eyebrow={s.hero.eyebrow} titleLines={s.hero.titleLines} lead={s.hero.lead}>
        <nav aria-label={s.hero.eyebrow} className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
          {s.areas.map((a) => (
            <a key={a.id} href={`#${a.id}`} className="chip">
              <Icon name={a.icon as IconName} size={18} className="text-orange-deep" />
              {a.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="pb-[var(--lp-space-section)]" aria-label={s.hero.eyebrow}>
        <div className="container-site grid grid-cols-1 gap-5 md:grid-cols-2">
          {s.areas.map((a, i) => (
            <article key={a.id} id={a.id} className="card flex min-w-0 scroll-mt-28 flex-col p-7 sm:p-9" aria-labelledby={`${a.id}-title`}>
              <div className="flex items-center gap-4">
                <span className="grid grid-cols-1 size-12 shrink-0 place-items-center rounded-[14px] bg-orange-tint text-orange-deep">
                  <Icon name={a.icon as IconName} size={24} />
                </span>
                <span className="text-sm font-semibold text-subtle tabular">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h2 id={`${a.id}-title`} className="text-h3 mt-6 break-anywhere">
                {a.title}
              </h2>
              <dl className="mt-5 grid grid-cols-1 gap-4">
                <div>
                  <dt className="eyebrow text-subtle">{s.labels.problem}</dt>
                  <dd className="mt-1.5 text-muted">{a.problem}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-orange-deep">{s.labels.solution}</dt>
                  <dd className="mt-1.5 font-medium">{a.solution}</dd>
                </div>
              </dl>
              <div className="mt-6 border-t border-graphite/[0.07] pt-5">
                <p className="eyebrow text-subtle">{s.labels.examples}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {a.examples.map((e) => (
                    <li key={e} className="pill pill-neutral h-auto min-h-7 whitespace-normal py-1 text-[0.8125rem]">
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-y bg-white" aria-labelledby="egyuttmukodes-cim">
        <div className="container-site">
          <SectionHeader id="egyuttmukodes-cim" eyebrow={s.engagement.eyebrow} title={s.engagement.title} lead={s.engagement.lead} />
          <ul className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {s.engagement.items.map((item) => {
              const featured = 'featured' in item && item.featured;
              return (
                <li
                  key={item.title}
                  className={cx(
                    'flex min-w-0 flex-col rounded-lg p-7 sm:p-8',
                    featured ? 'on-dark bg-graphite text-white shadow-lg' : 'bg-paper shadow-ring',
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-h3">{item.title}</h3>
                    {featured && <span className="pill bg-orange text-graphite">{s.engagement.featuredLabel}</span>}
                  </div>
                  <p className={cx('mt-3', featured ? 'text-on-dark-muted' : 'text-muted')}>{item.text}</p>
                  <p className="mt-6 text-lg font-semibold tracking-tight tabular">
                    <Rich>{item.price}</Rich>
                  </p>
                  <ul className="mt-6 grid grid-cols-1 gap-2.5">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-[0.9375rem]">
                        <Icon name="check" size={18} strokeWidth={2} className={cx('mt-0.5 shrink-0', featured ? 'text-orange-light' : 'text-orange-deep')} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Steps id="folyamat" />
      <CtaBand title={s.cta.title} text={s.cta.text} primary={s.cta.primary} secondary={s.cta.secondary} />
    </>
  );
}
