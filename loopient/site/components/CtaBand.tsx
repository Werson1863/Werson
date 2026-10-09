import { ButtonLink } from '@/components/ButtonLink';
import { Photo } from '@/components/Photo';
import { Rich } from '@/components/Rich';

type Link = { label: string; href: string };

/** Narancs záró CTA. Opcionálisan a fekete-fehér portré a kártya fölé, a felső élre lóg. */
export function CtaBand({
  title,
  text,
  primary,
  secondary,
  photoAlt,
}: {
  title: string;
  text: string;
  primary: Link;
  secondary?: Link;
  photoAlt?: string;
}) {
  return (
    <section className="pb-20 pt-10 sm:pb-28" aria-labelledby="cta-cim">
      <div className="container-site">
        <div className="relative">
          {photoAlt && (
            <div className="relative z-10 mx-auto -mb-16 w-32 sm:-mb-20 sm:w-40">
              <Photo name="portrait-bw" alt={photoAlt} sizes="160px" className="rounded-full shadow-lg ring-[6px] ring-paper" />
            </div>
          )}
          <div className="on-orange relative overflow-hidden rounded-2xl bg-orange px-6 pb-14 text-center text-graphite sm:px-12 sm:pb-20" style={{ paddingTop: photoAlt ? '6.5rem' : '4rem' }}>
            <div aria-hidden className="pattern-orange fade-radial pointer-events-none absolute inset-0" />
            <div className="relative mx-auto max-w-2xl">
              <h2 id="cta-cim" className="text-h1 break-anywhere">
                {title}
              </h2>
              <p className="text-lead mx-auto mt-5 max-w-xl text-graphite/85">
                <Rich>{text}</Rich>
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href={primary.href} arrow>
                  {primary.label}
                </ButtonLink>
                {secondary && (
                  <ButtonLink href={secondary.href} variant="outline-graphite">
                    {secondary.label}
                  </ButtonLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
