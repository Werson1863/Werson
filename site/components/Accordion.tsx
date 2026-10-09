'use client';

import { useId, useState } from 'react';
import { Icon } from '@/components/Icon';
import { cx } from '@/lib/cx';

type Item = { q: string; a: React.ReactNode };

/** Akadálymentes accordion: h3 > button[aria-expanded], panel role="region". Több elem is nyitva lehet. */
export function Accordion({ items, defaultOpen = 0 }: { items: Item[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen === null ? [] : [defaultOpen]));
  const base = useId();
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="divide-y divide-graphite/10 border-y border-graphite/10">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div key={i}>
            <h3 className="text-h4">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="group flex min-h-16 w-full cursor-pointer items-center justify-between gap-6 py-4 text-left"
              >
                <span className="break-anywhere">{item.q}</span>
                <span
                  className={cx(
                    'grid size-9 shrink-0 place-items-center rounded-full bg-white shadow-ring transition-transform duration-200 ease-brand',
                    isOpen && 'rotate-180',
                  )}
                >
                  <Icon name="chevron-down" size={18} strokeWidth={2} />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen}>
              <div className="enter max-w-2xl pb-6 pr-12 leading-relaxed text-muted">{item.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
