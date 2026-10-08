import Link from "next/link";
import { integrations, principles, processSteps } from "@/content/home";
import { site } from "@/config/site";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { ArrowLink, Container, SectionHeader } from "@/components/ui";
import { ReplaceFilter } from "./ReplaceFilter";

export function ReplaceSection() {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="kivaltjuk-cim">
      <Container>
        <SectionHeader
          id="kivaltjuk-cim"
          eyebrow="Mit váltunk ki"
          title="Ezeket a feladatokat többé nem kell kézzel csinálni."
          lead="Válaszd ki a területet, és nézd meg, mi az, ami nálatok is ismerős lehet."
        />
        <ReplaceFilter />
      </Container>
    </section>
  );
}

export function IntegrationsSection() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="integraciok-cim">
      <Container>
        <SectionHeader
          id="integraciok-cim"
          eyebrow="Integrációk"
          title="A már használt eszközeitekre építünk."
          lead="Nem kell új rendszert bevezetni. Összekötjük azt, ami már megvan – és ha valaminek van API-ja vagy exportja, azzal is dolgozunk."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((g, i) => (
            <li key={g.title} className="card min-w-0 p-6" data-reveal style={{ ["--i" as string]: i % 3 }}>
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-orange-wash text-orange-ink" aria-hidden="true">
                  <Icon name={g.icon} className="size-5" />
                </span>
                <h3 className="text-lg font-semibold tracking-[-0.02em]">{g.title}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${g.title} – példák`}>
                {g.tools.map((t) => (
                  <li key={t} className="wrap-anywhere rounded-full bg-mist px-3 py-1.5 text-sm font-medium">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="folyamat-cim">
      <Container>
        <SectionHeader
          id="folyamat-cim"
          eyebrow="Hogyan dolgozunk"
          title="Három lépés a kézi munkától az automatáig."
          lead="Átlátható menet, előre ismert költség, és semmi nem élesedik a jóváhagyásod nélkül."
        />
        <ol className="mt-14 grid gap-4 md:grid-cols-3">
          {processSteps.map((s, i) => (
            <li key={s.n} className="relative min-w-0 rounded-[1.25rem] bg-page p-7 shadow-[var(--shadow-card)]" data-reveal style={{ ["--i" as string]: i }}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="tnum text-5xl font-semibold tracking-[-0.04em] text-orange-ink" aria-hidden="true">
                  {s.n}
                </span>
                <span className="tnum rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-muted shadow-[var(--shadow-card)]">{s.meta}</span>
              </div>
              <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em]">
                <span className="sr-only">{i + 1}. lépés: </span>
                {s.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function PrinciplesSection() {
  return (
    <section className="on-dark bg-graphite py-20 text-white sm:py-28" aria-labelledby="elvek-cim">
      <Container>
        <SectionHeader
          id="elvek-cim"
          eyebrow="Alapelveink"
          title="Amiben nem kötünk kompromisszumot."
          lead="Az automatizálás csak akkor ér valamit, ha megbízhatsz benne. Ezért így dolgozunk."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <li key={p.title} className="min-w-0 rounded-[1.25rem] bg-ink-2 p-7 shadow-[var(--shadow-dark)]" data-reveal style={{ ["--i" as string]: i % 2 }}>
              <span className="grid size-11 place-items-center rounded-2xl bg-orange/15 text-orange-light" aria-hidden="true">
                <Icon name={p.icon} className="size-5" />
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-dark">{p.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function AboutTeaser() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="rolunk-cim">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div className="min-w-0" data-reveal>
            <div className="relative mx-auto max-w-sm md:max-w-none">
              <Photo
                id="portrait"
                alt={`${site.founder.name}, a Loopient alapítója, bézs öltönyben és barna nyakkendőben`}
                sizes="(min-width: 1152px) 470px, (min-width: 768px) 40vw, (min-width: 400px) 384px, 92vw"
                className="aspect-[4/5] w-full rounded-[1.75rem] object-cover shadow-[var(--shadow-raised)]"
              />
              <div className="absolute -bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl bg-white/90 p-4 shadow-[var(--shadow-raised)] backdrop-blur-md sm:left-auto sm:right-[-1.25rem] sm:w-64">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange text-graphite" aria-hidden="true">
                  <Icon name="bolt" className="size-5" />
                </span>
                <p className="text-sm leading-snug">
                  <span className="block font-semibold">{site.founder.name}</span>
                  <span className="text-muted">{site.founder.role}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="min-w-0 pt-6 md:pt-0" data-reveal style={{ ["--i" as string]: 1 }}>
            <p className="eyebrow">Ki áll mögötte</p>
            <h2 id="rolunk-cim" className="mt-3 text-[2rem] font-semibold sm:text-[2.75rem]">
              Személyesen, nem call centerből.
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
              Szia, {site.founder.name} vagyok, a Loopient alapítója. Évekig láttam közelről, mennyi időt visz el a
              cégeknél a másolgatás, a kézi riportkészítés és az elfelejtett utánkövetés. A Loopientet azért hoztam létre,
              hogy ezt a terhet levegyük a csapatokról – érthetően, emberi nyelven, és úgy, hogy a végén ti értsétek, mi
              miért történik.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">
              Minden projektet én vezetek az első beszélgetéstől az élesítésig, így mindig tudod, kihez fordulhatsz.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ArrowLink href="/rolunk" variant="secondary">
                Ismerj meg minket
              </ArrowLink>
              <Link href="/kapcsolat" className="btn btn-primary">
                Beszéljünk
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
