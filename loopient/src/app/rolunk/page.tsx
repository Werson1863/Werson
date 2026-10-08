import type { Metadata } from "next";
import { site } from "@/config/site";
import { principles } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { ClosingCta } from "@/components/ClosingCta";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { Container, PageHero, SectionHeader } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Rólunk – ki áll a Loopient mögött",
  description:
    "A Loopient egy személyes, magyar automatizálási műhely. Ismerd meg az alapítót, és azt, hogyan dolgozunk: érthetően, átláthatóan, a ti rendszereitekre építve.",
  path: "/rolunk",
});

// TODO: kitalált számok – lásd TODO.md
const facts = [
  { value: "10+", label: "év tapasztalat irodai folyamatokban" },
  { value: "40+", label: "automatizált folyamat élesben" },
  { value: "1 nap", label: "alatt válaszolunk minden megkeresésre" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Rólunk"
        title="Kevesebb kattintás. Több figyelem az emberekre."
        lead="A Loopient azért jött létre, hogy a magyar kis- és középvállalkozások ne a táblázatok és e-mailek közötti másolgatással töltsék a hetüket."
      />

      <section className="pb-20 sm:pb-28" aria-labelledby="alapito-cim">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div className="mx-auto grid w-full min-w-0 max-w-xl grid-cols-[1.15fr_0.85fr] gap-3 sm:gap-4 lg:max-w-none" data-reveal>
              <Photo
                id="portrait"
                alt={`${site.founder.name}, a Loopient alapítója – színes portré bézs öltönyben`}
                sizes="(min-width: 1152px) 300px, (min-width: 1024px) 26vw, (min-width: 640px) 330px, 54vw"
                className="aspect-[4/5] w-full rounded-[1.5rem] object-cover shadow-[var(--shadow-raised)]"
              />
              <Photo
                id="fullBody"
                alt={`${site.founder.name} teljes alakos fotója bézs öltönyben és barna nyakkendőben`}
                sizes="(min-width: 1152px) 220px, (min-width: 1024px) 19vw, (min-width: 640px) 240px, 40vw"
                className="mt-10 aspect-[2/3] w-full rounded-[1.5rem] object-cover shadow-[var(--shadow-raised)] sm:mt-16"
              />
            </div>
            <div className="min-w-0" data-reveal style={{ ["--i" as string]: 1 }}>
              <p className="eyebrow">Ki áll mögötte</p>
              <h2 id="alapito-cim" className="mt-3 text-[2rem] font-semibold sm:text-[2.75rem]">
                Szia, {site.founder.name} vagyok.
              </h2>
              {/* TODO: valódi bemutatkozó szöveg – lásd TODO.md */}
              <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-muted">
                <p>
                  Pályám nagy részét cégek működésének közelében töltöttem: pénzügyi folyamatok, riportok, rendszerek
                  bevezetése. Újra és újra azt láttam, hogy a legtehetségesebb kollégák is a hetük jelentős részét
                  gépies, ismétlődő feladatokkal töltik.
                </p>
                <p>
                  A Loopientet azért alapítottam, hogy ezt megváltoztassam. Nem nagyvállalati IT-projekteket építünk,
                  hanem kicsi, jól működő automatizmusokat, amelyek az első héttől időt adnak vissza.
                </p>
                <p>
                  Minden projektet személyesen vezetek, és úgy adom át, hogy a csapatod értse, mi miért történik.
                </p>
              </div>
              <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {facts.map((f) => (
                  <div key={f.label} className="card flex min-w-0 flex-col gap-1 p-5">
                    <dt className="text-sm leading-snug text-muted">{f.label}</dt>
                    <dd className="tnum order-first text-3xl font-semibold tracking-[-0.03em]">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section className="on-dark bg-graphite py-20 text-white sm:py-28" aria-labelledby="elvek-cim">
        <Container>
          <SectionHeader id="elvek-cim" eyebrow="Alapelveink" title="Így dolgozunk – minden projektben." />
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

      <section className="py-20 sm:py-28" aria-labelledby="kinek-cim">
        <Container>
          <SectionHeader
            id="kinek-cim"
            eyebrow="Kiknek dolgozunk"
            title="Ha ismerős, hogy „ezt minden héten kézzel csináljuk”…"
            lead="…akkor jó helyen jársz. Jellemzően 3–100 fős cégekkel dolgozunk, ahol nincs külön IT-csapat, de sok az ismétlődő adminisztráció."
          />
          <ul className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2">
            {[
              "Könyvelő- és tanácsadó irodák",
              "Webshopok és kereskedők",
              "Szolgáltató és projektalapú cégek",
              "Gyártó és logisztikai KKV-k",
            ].map((t) => (
              <li key={t} className="card flex min-w-0 items-center gap-3 p-5 font-semibold" data-reveal>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-orange-wash text-orange-ink" aria-hidden="true">
                  <Icon name="check" className="size-4" />
                </span>
                <span className="wrap-anywhere">{t}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ClosingCta title="Ismerjük meg egymást." />
    </>
  );
}
