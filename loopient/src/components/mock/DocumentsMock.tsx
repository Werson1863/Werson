import { Icon } from "@/components/Icon";
import { MockFrame, StatusPill } from "./MockFrame";

const docs = [
  { name: "Árajánlat – Kovács és Társa Bt.", meta: "Generálva sablonból · 2 perce", status: "wait" as const, label: "Rád vár" },
  { name: "Keretszerződés – Nagy Logisztika Kft.", meta: "Mindkét fél aláírta · tegnap", status: "done" as const, label: "Aláírva" },
  { name: "Teljesítésigazolás – 2026/10", meta: "Projektek / 2026 / Október", status: "info" as const, label: "Iktatva" },
  { name: "Megrendelés – Duna Webshop", meta: "Számla automatikusan kiállítva", status: "done" as const, label: "Lezárva" },
];

export function DocumentsMock() {
  return (
    <MockFrame
      title="Dokumentumok"
      meta="Ajánlatok, szerződések, igazolások"
      badge={
        <StatusPill tone="wait">
          <span className="tnum">1</span> rád vár
        </StatusPill>
      }
    >
      <ul className="divide-y divide-white/[0.07]">
        {docs.map((d) => (
          <li
            key={d.name}
            className={`flex items-center gap-3 px-4 py-3.5 sm:px-5 ${d.status === "wait" ? "bg-orange-wash/60" : ""}`}
          >
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-xl ${d.status === "wait" ? "bg-orange text-graphite" : "bg-mist"}`}
              aria-hidden="true"
            >
              <Icon name="doc" className="size-[18px]" />
            </span>
            <div className="min-w-0 break-words flex-1">
              <p className="text-sm font-semibold leading-snug">{d.name}</p>
              <p className="text-xs text-muted">{d.meta}</p>
            </div>
            <StatusPill tone={d.status}>
              {d.status === "wait" && <span className="size-1.5 rounded-full bg-orange" aria-hidden="true" />}
              {d.label}
            </StatusPill>
          </li>
        ))}
      </ul>
    </MockFrame>
  );
}
