import type { Metadata } from "next";
import { faqs } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { ClosingCta } from "@/components/ClosingCta";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import {
  AboutTeaser,
  IntegrationsSection,
  PrinciplesSection,
  ProcessSection,
  ReplaceSection,
} from "@/components/home/Sections";
import { Container, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Üzleti folyamat-automatizálás KKV-knak",
    description:
      "Automatizáljuk a riportokat, számlákat, dokumentumokat és a rendszerek közti adatmozgatást. Kevesebb kézi munka, több idő a lényegesre. Kérj ingyenes konzultációt!",
    path: "/",
  }),
  title: { absolute: "Loopient – Üzleti folyamat-automatizálás KKV-knak" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <ReplaceSection />
      <IntegrationsSection />
      <ProcessSection />
      <PrinciplesSection />
      <AboutTeaser />
      <section className="pb-20 sm:pb-28" aria-labelledby="gyik-cim">
        <Container className="max-w-3xl">
          <SectionHeader id="gyik-cim" eyebrow="GYIK" title="Gyakori kérdések" lead="Ha nem találod a választ, írj nekünk – egy munkanapon belül válaszolunk." />
          <div className="mt-12" data-reveal>
            <Faq items={faqs} />
          </div>
        </Container>
      </section>
      <ClosingCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </>
  );
}
