import { HeroMock } from "@/components/mock/HeroMock";
import { ArrowLink, Container } from "@/components/ui";
import Link from "next/link";
import { Backdrop } from "@/components/Backdrop";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-24" aria-labelledby="hero-cim">
      <Backdrop variant="hero" />
      <Container className="relative text-center">
        <p className="enter inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[0.8125rem] font-semibold text-muted shadow-[var(--shadow-card)]" style={{ ["--i" as string]: 0 }}>
          <span className="size-1.5 rounded-full bg-orange" aria-hidden="true" />
          Business automation · magyar KKV-knak
        </p>
        <h1 id="hero-cim" className="mx-auto mt-6 max-w-5xl text-[2.75rem] font-semibold sm:text-[4.25rem] lg:text-[5rem]">
          <span className="enter block" style={{ ["--i" as string]: 1 }}>
            Hatékonyabb folyamatok.
          </span>
          <span className="enter block text-muted" style={{ ["--i" as string]: 2 }}>
            Több idő a <span className="text-graphite">lényegesre.</span>
          </span>
        </h1>
        <p className="enter mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={{ ["--i" as string]: 3 }}>
          Automatizáljuk az ismétlődő irodai munkát – riportokat, számlákat, dokumentumokat és a rendszerek közti
          adatmozgatást –, hogy a csapatod arra figyelhessen, ami valóban számít.
        </p>
        <div className="enter mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center" style={{ ["--i" as string]: 4 }}>
          <ArrowLink href="/kapcsolat">Ingyenes konzultáció</ArrowLink>
          <Link href="/megoldasok" className="btn btn-secondary">
            Megoldásaink
          </Link>
        </div>
        <div className="enter mx-auto mt-14 max-w-2xl sm:mt-16" style={{ ["--i" as string]: 5 }}>
          <HeroMock />
        </div>
      </Container>
    </section>
  );
}
