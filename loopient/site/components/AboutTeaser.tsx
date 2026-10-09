import Link from 'next/link';
import { Photo } from '@/components/Photo';
import { Icon } from '@/components/Icon';
import { Rich } from '@/components/Rich';
import { copy } from '@/lib/content';

/** Rólunk-részlet a színes portréval. */
export function AboutTeaser() {
  const s = copy.home.aboutTeaser;
  return (
    <section className="section-y overflow-x-clip" aria-labelledby="rolunk-cim">
      <div className="container-site grid grid-cols-1 items-center gap-10 md:grid-cols-[5fr_7fr] lg:gap-20">
        <figure className="relative mx-auto w-full max-w-md">
          <div aria-hidden className="pattern-light absolute -inset-5 -z-10 rounded-[36px] opacity-80" />
          <Photo
            name="portrait-color"
            alt={copy.about.founder.portraitAlt}
            sizes="(min-width: 768px) 40vw, 92vw"
            className="rounded-xl shadow-lg"
          />
          <figcaption className="mt-3 text-sm text-subtle">{s.photoCaption}</figcaption>
        </figure>
        <div className="min-w-0">
          <p className="eyebrow text-orange-deep">{s.eyebrow}</p>
          <h2 id="rolunk-cim" className="text-h2 mt-4">
            {s.title}
          </h2>
          <p className="text-lead mt-6 text-muted">
            <Rich>{s.text}</Rich>
          </p>
          <Link href={s.link.href} className="link-arrow mt-6">
            {s.link.label}
            <Icon name="arrow-right" size={18} strokeWidth={2} className="btn-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}
