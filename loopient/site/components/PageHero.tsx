import { Rich } from '@/components/Rich';

/** Aloldalak fejléce: középre igazított, tördelt cím, L-mintázatos háttérrel. */
export function PageHero({ eyebrow, titleLines, lead, children }: { eyebrow: string; titleLines: string[]; lead: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden" aria-labelledby="page-title">
      <div aria-hidden className="pattern-light fade-radial pointer-events-none absolute inset-0" />
      <div className="container-site relative pt-16 pb-14 text-center sm:pt-24 sm:pb-20">
        <p className="eyebrow enter text-orange-deep">{eyebrow}</p>
        <h1 id="page-title" className="text-h1 mx-auto mt-5 max-w-4xl break-anywhere">
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="text-lead mx-auto mt-6 max-w-2xl text-muted">
          <Rich>{lead}</Rich>
        </p>
        {children}
      </div>
    </section>
  );
}
