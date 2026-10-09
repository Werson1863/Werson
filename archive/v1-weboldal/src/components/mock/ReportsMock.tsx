"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/Icon";
import { MockFrame, StatusPill } from "./MockFrame";

const reports = [
  { name: "Heti értékesítési riport", when: "Hétfő 7:00", to: "Vezetőség", approval: true },
  { name: "Havi cash-flow összesítő", when: "Minden hónap 1.", to: "Pénzügy", approval: true },
  { name: "Napi készletriport", when: "Naponta 6:30", to: "Raktár", approval: false },
];

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="group relative -m-2 inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center p-2"
    >
      <span
        className={`relative h-6 w-10 rounded-full shadow-[inset_0_0_0_1px_rgb(15_17_21/0.08)] ${checked ? "bg-orange" : "bg-graphite/15"}`}
      >
        <span
          className="absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow-[0_1px_3px_rgb(15_17_21/0.25)] transition-transform duration-200 ease-[var(--ease-out)] group-active:scale-95"
          style={{ transform: checked ? "translateX(16px)" : "translateX(0)" }}
        />
      </span>
    </button>
  );
}

export function ReportsMock() {
  const [state, setState] = useState(reports.map((r) => r.approval));
  const id = useId();
  const pending = state.filter(Boolean).length;
  return (
    <MockFrame
      title="Ütemezett riportok"
      meta={
        <>
          <span className="tnum">{reports.length}</span> aktív ütemezés
        </>
      }
      badge={
        <StatusPill tone={pending ? "wait" : "done"}>
          <span className="tnum">{pending}</span> jóváhagyással
        </StatusPill>
      }
    >
      <ul className="divide-y divide-graphite/[0.06]">
        {reports.map((r, i) => (
          <li key={r.name} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-mist" aria-hidden="true">
              <Icon name="chart" className="size-[18px]" />
            </span>
            <div className="min-w-0 break-words flex-1">
              <p id={`${id}-${i}`} className="text-sm font-semibold leading-snug">
                {r.name}
              </p>
              <p className="text-xs text-muted">
                {r.when} · {r.to}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-muted sm:inline" aria-hidden="true">
                Jóváhagyás
              </span>
              <Switch
                checked={state[i]}
                label={`${r.name}: jóváhagyás kiküldés előtt`}
                onChange={(v) => setState((s) => s.map((x, j) => (j === i ? v : x)))}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="bg-mist/70 px-4 py-3 text-xs text-muted sm:px-5" aria-live="polite">
        {pending
          ? `${pending} riport kiküldés előtt a jóváhagyásodra vár.`
          : "Minden riport automatikusan megy ki."}
      </p>
    </MockFrame>
  );
}
