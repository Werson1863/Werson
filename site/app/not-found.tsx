import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ButtonLink';
import { copy } from '@/lib/content';

export const metadata: Metadata = {
  title: copy.meta.pages.notFound.title,
  description: copy.meta.pages.notFound.description,
  robots: { index: false },
};

export default function NotFound() {
  const n = copy.micro.notFound;
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pattern-light fade-radial pointer-events-none absolute inset-0" />
      <div className="container-site relative py-28 text-center sm:py-36">
        <p className="eyebrow text-orange-deep">{n.eyebrow}</p>
        <h1 className="text-h1 mx-auto mt-5 max-w-3xl">{n.title}</h1>
        <p className="text-lead mx-auto mt-5 max-w-xl text-muted">{n.text}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" arrow>
            {copy.micro.buttons.backHome}
          </ButtonLink>
          <ButtonLink href="/megoldasok" variant="secondary">
            {copy.nav.items[0].label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
