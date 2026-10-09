import { Icon, type IconName } from "@/components/Icon";
import { MockFrame, StatusPill } from "./MockFrame";

const systems: { name: string; icon: IconName }[] = [
  { name: "Webshop", icon: "cart" },
  { name: "Számlázó", icon: "receipt" },
  { name: "Könyvelés", icon: "table" },
];

const events = [
  { time: "09:41", text: "Új rendelés #10482 → számla kiállítva" },
  { time: "09:41", text: "Számla SZ-2026/1187 → könyvelésbe átadva" },
  { time: "09:12", text: "Készlet frissítve: 18 termék" },
];

export function SyncMock() {
  return (
    <MockFrame
      title="Rendszerek szinkronja"
      meta="Valós idejű adatmozgatás"
      badge={
        <StatusPill>
          <Icon name="sync" className="size-3" /> Szinkronban
        </StatusPill>
      }
    >
      <div className="px-4 py-6 sm:px-5">
        <div className="flex items-center" aria-hidden="true">
          {systems.map((s, i) => (
            <div key={s.name} className="contents">
              <div className="flex w-20 shrink-0 flex-col items-center gap-2 sm:w-24">
                <span className="grid size-12 place-items-center rounded-2xl bg-mist shadow-[var(--shadow-card)]">
                  <Icon name={s.icon} className="size-5" />
                </span>
                <span className="text-xs font-semibold">{s.name}</span>
              </div>
              {i < systems.length - 1 && (
                <div className="relative -mt-6 h-px min-w-4 flex-1 bg-white/15">
                  <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange shadow-[0_0_0_4px_rgb(249_115_22/0.18)]" />
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="sr-only">A webshop, a számlázó és a könyvelés automatikusan szinkronban van.</p>
      </div>
      <ul className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
        {events.map((e) => (
          <li key={e.text} className="flex items-center gap-3 px-4 py-3 text-sm sm:px-5">
            <span className="tnum w-11 shrink-0 text-xs font-medium text-muted">{e.time}</span>
            <span className="min-w-0 break-words flex-1">{e.text}</span>
            <Icon name="check" className="size-4 shrink-0 text-emerald-300" />
          </li>
        ))}
      </ul>
      <p className="bg-mist/70 px-4 py-3 text-xs text-muted sm:px-5">Utolsó szinkron: 2 perce · 0 hiba az elmúlt 30 napban</p>
    </MockFrame>
  );
}
