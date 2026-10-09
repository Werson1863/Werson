import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { DocumentsMock } from "@/components/mock/DocumentsMock";
import { ReportsMock } from "@/components/mock/ReportsMock";
import { SyncMock } from "@/components/mock/SyncMock";
import { Container, SectionHeader } from "@/components/ui";
import { Backdrop } from "@/components/Backdrop";

const rows: { eyebrow: string; title: string; body: string; points: string[]; mock: ReactNode }[] = [
  {
    eyebrow: "Riportok",
    title: "Riportok, amelyek maguktól elkészülnek",
    body: "Az adatok összegyűjtése, táblázatba rendezése és kiküldése ütemezetten fut. Te döntöd el, mi menjen ki automatikusan, és mi várjon a jóváhagyásodra.",
    points: ["Több forrásból, egy összesítőbe", "Jóváhagyás kiküldés előtt – ha kéred", "Pontosan, minden héten ugyanakkor"],
    mock: <ReportsMock />,
  },
  {
    eyebrow: "Dokumentumok",
    title: "Dokumentumok, amelyek nem vesznek el",
    body: "Árajánlat, szerződés, teljesítésigazolás: sablonból készül, aláírásra megy, majd a helyére kerül. Csak akkor szólunk, ha tényleg rád vár valami.",
    points: ["Sablonból, a meglévő adataidból", "„Rád vár” jelzés, nem e-mail-áradat", "Egységes elnevezés és iktatás"],
    mock: <DocumentsMock />,
  },
  {
    eyebrow: "Integráció",
    title: "Rendszerek, amelyek végre szót értenek",
    body: "A webshop, a számlázó, a CRM és a táblázatok szinkronban maradnak. Egyszer rögzíted az adatot, és mindenhol frissül – másolgatás és elírás nélkül.",
    points: ["Meglévő eszközeidre építve", "Hibafigyelés és naplózás", "Nincs dupla adatrögzítés"],
    mock: <SyncMock />,
  },
];

export function Features() {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-28" aria-labelledby="funkciok-cim">
      <Backdrop variant="soft" />
      <Container>
        <SectionHeader
          id="funkciok-cim"
          eyebrow="Mit csinálunk"
          title="A háttérmunka, amit senki nem szeret – elintézve."
          lead="Három terület, ahol a legtöbb időt és idegeskedést spórolhatod meg."
        />
        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
          {rows.map((r, i) => (
            <div key={r.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={`min-w-0 max-w-2xl ${i % 2 ? "lg:order-2" : ""}`} data-reveal>
                <p className="eyebrow">
                  <span className="tnum">0{i + 1}</span> · {r.eyebrow}
                </p>
                <h3 className="mt-3 text-[1.75rem] font-semibold sm:text-[2.25rem]">{r.title}</h3>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">{r.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[0.9375rem]">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-orange-wash text-orange-ink" aria-hidden="true">
                        <Icon name="check" className="size-3.5" />
                      </span>
                      <span className="wrap-anywhere">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`min-w-0 ${i % 2 ? "lg:order-1" : ""}`} data-reveal style={{ ["--i" as string]: 1 }}>
                <div className="rounded-[1.75rem] bg-mist p-3 sm:p-6">{r.mock}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
