import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ClosingCta } from "@/components/ClosingCta";
import { Icon, type IconName } from "@/components/Icon";
import { IntegrationsSection, ProcessSection } from "@/components/home/Sections";
import { ArrowLink, Container, PageHero, SectionHeader } from "@/components/ui";
import { Backdrop } from "@/components/Backdrop";

export const metadata: Metadata = pageMetadata({
  title: "Megoldások – riport, számla, dokumentum és integráció automatizálás",
  description:
    "Pénzügyi, értékesítési, dokumentum- és webshop-folyamatok automatizálása a meglévő rendszereidre építve. Nézd meg, miben segíthetünk, és mennyibe kerül.",
  path: "/megoldasok",
});

// TODO: az "eredmény" számok kitaláltak – lásd TODO.md
const areas: { id: string; icon: IconName; title: string; lead: string; items: string[]; result: string }[] = [
  {
    id: "penzugy",
    icon: "receipt",
    title: "Pénzügy és számlázás",
    lead: "A számla útja a beérkezéstől a könyvelésig – kézi rögzítés nélkül.",
    items: ["Bejövő számlák kiolvasása és rögzítése", "Automatikus számlakiállítás rendelésből", "Fizetési emlékeztetők", "Banki jóváírások párosítása"],
    result: "akár heti 6–8 óra",
  },
  {
    id: "riportok",
    icon: "chart",
    title: "Riportok és kimutatások",
    lead: "Naprakész számok minden reggel, másolgatás nélkül.",
    items: ["Értékesítési és pénzügyi összesítők", "Több forrás egy táblában", "Ütemezett kiküldés, opcionális jóváhagyással", "Eltérés esetén azonnali riasztás"],
    result: "akár heti 3–5 óra",
  },
  {
    id: "ertekesites",
    icon: "users",
    title: "Értékesítés és CRM",
    lead: "Egyetlen érdeklődő se vesszen el a postafiókban.",
    items: ["Érdeklődők automatikusan a CRM-be", "Ajánlat generálása sablonból", "Utánkövetési emlékeztetők", "Felelős kiosztása szabályok szerint"],
    result: "akár 30%-kal gyorsabb válaszidő",
  },
  {
    id: "dokumentumok",
    icon: "doc",
    title: "Dokumentumkezelés",
    lead: "Szerződések és igazolások a helyükön, egységes névvel.",
    items: ["Dokumentum-generálás sablonból", "Elektronikus aláíratás", "Automatikus iktatás és elnevezés", "„Rád vár” jelzés a teendőkről"],
    result: "akár heti 2–4 óra",
  },
  {
    id: "webshop",
    icon: "cart",
    title: "Webshop és készlet",
    lead: "Rendelés, számla, készlet és szállítás összehangolva.",
    items: ["Rendelés → számla → könyvelés", "Készletszinkron több csatorna között", "Rendelésállapot-értesítők a vevőnek", "Napi eladási összesítő"],
    result: "akár 90%-kal kevesebb kézi rögzítés",
  },
  {
    id: "ugyfelkapcsolat",
    icon: "chat",
    title: "Ügyfélkapcsolat és belső kommunikáció",
    lead: "Gyors, következetes válaszok – az emberi döntések megtartásával.",
    items: ["Gyakori kérdések előkészített válasza", "Beérkező kérések kategorizálása", "Értesítések Slackbe vagy Teamsbe", "Új munkatárs beléptetési folyamata"],
    result: "akár heti 3–6 óra",
  },
];

// TODO: árak kitaláltak – lásd TODO.md
const packages = [
  {
    name: "Felmérés",
    price: "Ingyenes",
    unit: "30 perc",
    body: "Átbeszéljük a folyamataidat, és megmutatjuk, hol a legnagyobb nyereség.",
    features: ["Online vagy személyesen", "Írásos összefoglaló", "Kötelezettség nélkül"],
    featured: false,
  },
  {
    name: "Egy folyamat",
    price: "150 000 Ft-tól",
    unit: "+ áfa, egyszeri",
    body: "Egy jól körülhatárolt folyamat automatizálása, élesítéssel és dokumentációval.",
    features: ["Fix ár a felmérés után", "1–3 hét átfutás", "30 nap ingyenes hibajavítás", "Átadás és betanítás"],
    featured: true,
  },
  {
    name: "Üzemeltetés",
    price: "25 000 Ft-tól",
    unit: "+ áfa / hó",
    body: "Folyamatos felügyelet, hibajavítás és havi finomhangolás.",
    features: ["Futások monitorozása", "Hiba esetén azonnali javítás", "Havi egyeztetés", "Kisebb módosítások benne"],
    featured: false,
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Megoldások"
        title="Automatizálás ott, ahol a legtöbb időt nyered."
        lead="A meglévő eszközeidre építünk, és azokat a folyamatokat automatizáljuk, amelyek ma kézzel, ismétlődően, hibalehetőséggel futnak."
      >
        <nav aria-label="Területek" className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2">
          {areas.map((a) => (
            <a key={a.id} href={`#${a.id}`} className="btn btn-secondary !px-4 !text-sm !font-medium">
              {a.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="relative isolate overflow-hidden pb-20 sm:pb-28" aria-label="Megoldási területek">
        <Backdrop variant="soft" />
        <Container>
          <ul className="grid gap-4 md:grid-cols-2">
            {areas.map((a, i) => (
              <li key={a.id} id={a.id} className="card flex min-w-0 scroll-mt-28 flex-col p-7 sm:p-8" data-reveal style={{ ["--i" as string]: i % 2 }}>
                <span className="grid size-12 place-items-center rounded-2xl bg-orange-wash text-orange-ink" aria-hidden="true">
                  <Icon name={a.icon} className="size-6" />
                </span>
                <h2 className="mt-6 text-2xl font-semibold">{a.title}</h2>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-muted">{a.lead}</p>
                <ul className="mt-6 space-y-2.5">
                  {a.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-[0.9375rem]">
                      <Icon name="check" className="mt-0.5 size-4 shrink-0 text-orange-ink" />
                      <span className="wrap-anywhere">{it}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto flex items-start gap-2 pt-7 text-sm">
                  <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-orange-ink" />
                  <span>
                    <span className="text-muted">Becsült megtakarítás: </span>
                    <span className="font-semibold">{a.result}</span>
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ProcessSection />

      <section className="relative isolate overflow-hidden py-20 sm:py-28" aria-labelledby="arak-cim">
        <Backdrop variant="glow" />
        <Container>
          <SectionHeader
            id="arak-cim"
            eyebrow="Árak"
            title="Előre ismert, fix költség."
            lead="Nincs óradíjas meglepetés: a felmérés után fix árajánlatot adunk, és csak akkor indulunk, ha megéri neked."
          />
          <ul className="mt-14 grid gap-4 lg:grid-cols-3">
            {packages.map((p, i) => (
              <li
                key={p.name}
                className={`relative flex min-w-0 flex-col rounded-[1.25rem] p-7 sm:p-8 ${
                  p.featured ? "on-dark bg-ink-2 text-white shadow-[inset_0_0_0_1px_rgb(249_115_22/0.45),0_24px_60px_-24px_rgb(249_115_22/0.45)]" : "card"
                }`}
                data-reveal
                style={{ ["--i" as string]: i }}
              >
                {p.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-orange px-2.5 py-1 text-xs font-semibold text-graphite">
                    Legnépszerűbb
                  </span>
                )}
                <h3 className="text-lg font-semibold tracking-[-0.02em]">{p.name}</h3>
                <p className="mt-5">
                  <span className="text-[2.25rem] font-semibold tracking-[-0.03em] [font-variant-numeric:lining-nums]">{p.price}</span>
                  <span className={`mt-1 block text-sm ${p.featured ? "text-muted-dark" : "text-muted"}`}>{p.unit}</span>
                </p>
                <p className={`mt-4 text-[0.9375rem] leading-relaxed ${p.featured ? "text-muted-dark" : "text-muted"}`}>{p.body}</p>
                <ul className="mt-6 space-y-2.5 pb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[0.9375rem]">
                      <Icon name="check" className={`mt-0.5 size-4 shrink-0 ${p.featured ? "text-orange-light" : "text-orange-ink"}`} />
                      <span className="wrap-anywhere">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <ArrowLink href="/kapcsolat" variant={p.featured ? "accent" : "secondary"} className="w-full">
                    {p.name === "Felmérés" ? "Időpontot kérek" : "Ajánlatot kérek"}
                  </ArrowLink>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <IntegrationsSection />
      <ClosingCta />
    </>
  );
}
