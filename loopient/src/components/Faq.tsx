"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/Icon";

/**
 * WAI-ARIA accordion: Enter/Space nyit-zár, ↑/↓ a fejlécek között lép, Home/End az elsőre/utolsóra.
 */
export function Faq({ items }: { items: ReadonlyArray<{ q: string; a: string }> }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = items.length - 1;
    const target = { ArrowDown: i === last ? 0 : i + 1, ArrowUp: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (target === undefined) return;
    e.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <div className="divide-y divide-white/[0.08] rounded-[1.25rem] bg-surface px-5 shadow-[var(--shadow-card)] sm:px-8">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.q}>
            <h3 className="text-base font-semibold tracking-[-0.01em] sm:text-lg">
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="group flex min-h-[64px] w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="wrap-anywhere">{item.q}</span>
                <span
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-mist transition-transform duration-200 ease-out"
                  style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                  aria-hidden="true"
                >
                  <Icon name="plus" className="size-4" />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen} className={isOpen ? "faq-panel" : undefined}>
              <p className="wrap-anywhere max-w-2xl pb-6 text-[0.9375rem] sm:pr-12 leading-relaxed text-muted">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
