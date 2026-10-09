'use client';

import { useState } from 'react';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/lib/brand.generated';

type Item = { category: string; icon: string; title: string; text: string };
type Category = { id: string; label: string };

/** Szűrhető folyamat-kártyák. A chipek aria-pressed gombok; a találatszámot élő régió jelzi. */
export function ProcessFilter({
  items,
  categories,
  allLabel,
  filterLabel,
  countLabel,
  empty,
}: {
  items: Item[];
  categories: Category[];
  allLabel: string;
  filterLabel: string;
  countLabel: string;
  empty: string;
}) {
  const [active, setActive] = useState<string>('all');
  const visible = active === 'all' ? items : items.filter((i) => i.category === active);
  const labelOf = Object.fromEntries(categories.map((c) => [c.id, c.label]));
  const chips = [{ id: 'all', label: allLabel }, ...categories];

  return (
    <div className="mt-10">
      <div role="group" aria-label={filterLabel} className="-mx-[var(--lp-space-gutter)] flex gap-2 overflow-x-auto px-[var(--lp-space-gutter)] pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        {chips.map((c) => (
          <button key={c.id} type="button" className="chip shrink-0" aria-pressed={active === c.id} onClick={() => setActive(c.id)}>
            {c.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {countLabel.replace('{n}', String(visible.length))}
      </p>
      {visible.length === 0 ? (
        <p className="mt-8 text-muted">{empty}</p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <li key={item.title} className="card enter flex min-w-0 flex-col p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="grid grid-cols-1 size-11 place-items-center rounded-[12px] bg-orange-tint text-orange-deep">
                  <Icon name={item.icon as IconName} size={22} />
                </span>
                <span className="pill pill-neutral">{labelOf[item.category]}</span>
              </div>
              <h3 className="text-h4 mt-5 break-anywhere">{item.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
