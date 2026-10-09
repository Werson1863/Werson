import { PageHero } from '@/components/PageHero';
import { Photo } from '@/components/Photo';
import { Rich } from '@/components/Rich';
import { Principles } from '@/components/Principles';
import { CtaBand } from '@/components/CtaBand';
import { Icon } from '@/components/Icon';
import { copy } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('about', '/rolunk');

export default function AboutPage() {
  const a = copy.about;
  const f = a.founder;
  const hasLinkedin = !f.linkedin.href.startsWith('[');
  return (
    <>
      <PageHero eyebrow={a.hero.eyebrow} titleLines={a.hero.titleLines} lead={a.hero.lead} />

      <section className="pb-[var(--lp-space-section)]" aria-labelledby="tortenet-cim">
        <div className="container-site grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <h2 id="tortenet-cim" className="text-h2">
            {a.story.title}
          </h2>
          <div className="grid grid-cols-1 gap-5 text-lead text-muted">
            {a.story.paragraphs.map((p, i) => (
              <p key={i}>
                <Rich>{p}</Rich>
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-white" aria-labelledby="alapito-cim">
        <div className="container-site grid grid-cols-1 items-start gap-12 md:grid-cols-[5fr_7fr] lg:gap-20">
          <figure className="mx-auto w-full max-w-sm md:sticky md:top-28">
            <Photo name="full-body" alt={f.photoAlt} sizes="(min-width: 768px) 36vw, 92vw" className="rounded-xl shadow-lg" />
          </figure>
          <div className="min-w-0">
            <p className="eyebrow text-orange-deep">{f.role}</p>
            <h2 id="alapito-cim" className="text-h2 mt-4 break-anywhere">
              <Rich>{f.name}</Rich>
            </h2>
            <p className="text-lead mt-6 text-muted">
              <Rich>{f.bio}</Rich>
            </p>
            <blockquote className="mt-10 border-l-[3px] border-orange pl-6">
              <p className="text-h3 font-semibold">„{f.quote}”</p>
            </blockquote>
            {hasLinkedin ? (
              <a href={f.linkedin.href} className="link-arrow mt-8" rel="me noopener" target="_blank">
                {f.linkedin.label}
                <Icon name="arrow-up-right" size={18} strokeWidth={2} className="btn-icon" />
                <span className="sr-only">{copy.micro.a11y.external}</span>
              </a>
            ) : (
              <p className="mt-8 text-sm text-subtle">
                {f.linkedin.label}: <Rich>{f.linkedin.href}</Rich>
              </p>
            )}

            <div className="mt-12 rounded-lg bg-paper p-6 shadow-ring sm:p-8">
              <h3 className="text-h4">{a.facts.title}</h3>
              <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {a.facts.items.map((it) => (
                  <div key={it.label} className="min-w-0">
                    <dt className="text-sm text-subtle">{it.label}</dt>
                    <dd className="mt-0.5 break-anywhere font-medium">
                      <Rich>{it.value}</Rich>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <Principles />
      <CtaBand title={a.cta.title} text={a.cta.text} primary={a.cta.primary} />
    </>
  );
}
