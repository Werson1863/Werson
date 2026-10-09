import { Hero } from '@/components/Hero';
import { SectionHeader } from '@/components/SectionHeader';
import { FeatureRows } from '@/components/FeatureRows';
import { ProcessFilter } from '@/components/ProcessFilter';
import { Integrations } from '@/components/Integrations';
import { Steps } from '@/components/Steps';
import { Principles } from '@/components/Principles';
import { AboutTeaser } from '@/components/AboutTeaser';
import { Faq } from '@/components/Faq';
import { CtaBand } from '@/components/CtaBand';
import { copy } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('home', '/');

export default function HomePage() {
  const h = copy.home;
  const p = h.processes;
  return (
    <>
      <Hero />

      <section className="section-y overflow-x-clip pt-8 sm:pt-10" aria-labelledby="funkciok-cim">
        <div className="container-site">
          <SectionHeader id="funkciok-cim" eyebrow={h.featuresIntro.eyebrow} title={h.featuresIntro.title} lead={h.featuresIntro.lead} />
          <FeatureRows />
        </div>
      </section>

      <section className="section-y bg-mist" aria-labelledby="folyamatok-cim">
        <div className="container-site">
          <SectionHeader id="folyamatok-cim" eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
          <ProcessFilter
            items={p.items}
            categories={p.categories}
            allLabel={p.all}
            filterLabel={p.filterLabel}
            countLabel={p.countLabel}
            empty={p.empty}
          />
        </div>
      </section>

      <Integrations />
      <Steps />
      <Principles />
      <AboutTeaser />
      <Faq />
      <CtaBand
        title={h.cta.title}
        text={h.cta.text}
        primary={h.cta.primary}
        secondary={h.cta.secondary}
        photoAlt={h.cta.photoAlt}
      />
    </>
  );
}
