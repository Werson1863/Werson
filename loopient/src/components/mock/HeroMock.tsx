import { heroTasks } from "@/content/home";
import { Icon } from "@/components/Icon";
import { MockFrame, StatusPill } from "./MockFrame";

export function HeroMock() {
  return (
    <figure aria-label="Példa: reggeli automatikus feladatok összesítője">
      <MockFrame
        title="Ma reggel, automatikusan"
        meta="Hétfő · 5 feladat · 0 kézi lépés"
        badge={
          <StatusPill>
            <span className="relative inline-block size-1.5 rounded-full text-emerald-400 pulse-dot" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-emerald-400" />
            </span>
            Fut
          </StatusPill>
        }
      >
        <ol className="divide-y divide-white/[0.07]">
          {heroTasks.map((t, i) => (
            <li key={t.time} className="enter flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5" style={{ ["--i" as string]: i + 5 }}>
              <span className="tnum w-11 shrink-0 text-xs font-medium text-muted">{t.time}</span>
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-mist text-ink" aria-hidden="true">
                <Icon name={t.icon} className="size-[18px]" />
              </span>
              <span className="min-w-0 break-words flex-1">
                <span className="block text-sm font-semibold leading-snug">{t.title}</span>
                <span className="block text-xs text-muted">{t.meta}</span>
              </span>
              <span className="hidden sm:block">
                <StatusPill>
                  <Icon name="check" className="size-3" /> Kész
                </StatusPill>
              </span>
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300 sm:hidden" role="img" aria-label="Kész">
                <Icon name="check" className="size-3.5" />
              </span>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap items-center justify-between gap-2 bg-mist/70 px-4 py-3 text-xs sm:px-5">
          <span className="text-muted">Utolsó futás: 06:07</span>
          <span className="font-semibold">
            <span className="tnum">≈ 2 óra 40 perc</span> kézi munka megspórolva
          </span>
        </div>
      </MockFrame>
      <figcaption className="sr-only">
        Öt reggeli feladat, amelyek emberi beavatkozás nélkül lefutottak: riport, számlarögzítés, CRM-frissítés,
        készletszinkron és szerződés-emlékeztető.
      </figcaption>
    </figure>
  );
}
