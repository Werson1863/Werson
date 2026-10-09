import Link from "next/link";
import { site } from "@/config/site";
import { Photo } from "@/components/Photo";
import { ArrowLink, Container } from "@/components/ui";
import { Backdrop } from "@/components/Backdrop";

/** Narancs záró CTA a fekete-fehér portréval – minden oldal alján, a footer felett. */
export function ClosingCta({
  title = "Nézzük meg együtt, mit érdemes automatizálni.",
  lead = "Egy 30 perces, ingyenes beszélgetés után pontosan látni fogod, hol veszít időt a csapatod, és mennyit nyerhetsz vissza.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="pb-20 sm:pb-28" aria-labelledby="zaro-cta-cim">
      <Container>
        <div className="on-orange relative isolate overflow-hidden rounded-[2rem] bg-orange text-graphite shadow-[0_24px_60px_-24px_rgb(194_65_12/0.55)]" data-reveal>
          <Backdrop variant="cta" />
          <div className="grid items-end md:grid-cols-[1.25fr_0.75fr]">
            <div className="min-w-0 p-8 sm:p-12 lg:p-16">
              <p className="text-sm font-semibold">Ingyenes konzultáció</p>
              <h2 id="zaro-cta-cim" className="mt-3 text-[2rem] font-semibold sm:text-[3rem]">
                {title}
              </h2>
              <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-graphite/85">{lead}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ArrowLink href="/kapcsolat" variant="dark">Kérj ajánlatot</ArrowLink>
                <Link href="/megoldasok" className="btn btn-glass-light">
                  Megoldások
                </Link>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[22rem] self-end px-8 md:max-w-none md:px-0 md:pr-10 lg:pr-14">
              <Photo
                id="portraitBw"
                alt={`${site.founder.name}, a Loopient alapítója – fekete-fehér portré`}
                sizes="(min-width: 1152px) 380px, (min-width: 768px) 32vw, 352px"
                className="aspect-[4/5] w-full rounded-t-[1.5rem] object-cover object-top"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
