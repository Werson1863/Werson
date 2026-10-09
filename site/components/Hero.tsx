import { ButtonLink } from '@/components/ButtonLink';
import { HeroMock } from '@/components/mock/HeroMock';
import { Rich } from '@/components/Rich';
import { copy } from '@/lib/content';

/** Középre igazított hero, nagy tördelt címmel és a „Ma reggel, automatikusan” mock-UI-val. */
export function Hero() {
  const h = copy.home.hero;
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-cim">
      <div aria-hidden className="pattern-light fade-radial pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent to-paper" />
      <div className="container-site relative pt-14 pb-20 text-center sm:pt-24 sm:pb-28">
        <p className="enter inline-flex min-h-9 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-muted shadow-ring">
          <span aria-hidden className="size-1.5 rounded-full bg-orange" />
          {h.eyebrow}
        </p>
        <h1 id="hero-cim" className="text-display mx-auto mt-7 max-w-5xl break-anywhere">
          {h.titleLines.map((line, i) => (
            <span key={i} className={i === h.titleLines.length - 1 ? 'block text-orange-deep' : 'block'}>
              {line}
            </span>
          ))}
        </h1>
        <p className="text-lead mx-auto mt-7 max-w-2xl text-muted">
          <Rich>{h.lead}</Rich>
        </p>
        <div className="enter mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: '180ms' }}>
          <ButtonLink href={h.primary.href} arrow className="w-full sm:w-auto">
            {h.primary.label}
          </ButtonLink>
          <ButtonLink href={h.secondary.href} variant="secondary" className="w-full sm:w-auto">
            {h.secondary.label}
          </ButtonLink>
        </div>
        <p className="mt-4 text-sm text-subtle">{h.note}</p>

        <div className="relative mx-auto mt-14 max-w-xl sm:mt-20">
          <div aria-hidden className="absolute -inset-x-8 -bottom-6 top-10 -z-10 rounded-[40px] bg-orange/10 blur-2xl" />
          <HeroMock mock={h.mock} />
        </div>
      </div>
    </section>
  );
}
