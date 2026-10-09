import { Accordion } from '@/components/Accordion';
import { Rich } from '@/components/Rich';
import { SectionHeader } from '@/components/SectionHeader';
import { ButtonLink } from '@/components/ButtonLink';
import { copy } from '@/lib/content';

export function Faq() {
  const s = copy.home.faqIntro;
  return (
    <section id="gyik" className="section-y bg-white" aria-labelledby="gyik-cim">
      <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader id="gyik-cim" eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
          <ButtonLink href="/kapcsolat" variant="secondary" arrow className="mt-8">
            {copy.micro.buttons.contact}
          </ButtonLink>
        </div>
        <Accordion items={copy.faq.items.map((f) => ({ q: f.q, a: <Rich>{f.a}</Rich> }))} />
      </div>
    </section>
  );
}
