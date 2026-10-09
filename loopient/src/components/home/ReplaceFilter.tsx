"use client";

import { useState } from "react";
import { replaceCategories, replaceItems, type ReplaceCategory } from "@/content/home";
import { Icon } from "@/components/Icon";

type Filter = "Mind" | ReplaceCategory;

export function ReplaceFilter() {
  const [filter, setFilter] = useState<Filter>("Mind");
  const items = filter === "Mind" ? replaceItems : replaceItems.filter((i) => i.category === filter);

  return (
    <div className="mt-12">
      <div role="group" aria-label="Szűrés terület szerint" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
        {(["Mind", ...replaceCategories] as Filter[]).map((c) => {
          const active = c === filter;
          const count = c === "Mind" ? replaceItems.length : replaceItems.filter((i) => i.category === c).length;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c)}
              className={`btn shrink-0 !px-4 !text-sm !font-medium ${active ? "btn-primary" : "btn-secondary"}`}
            >
              {c}
              <span className={`tnum text-xs ${active ? "text-graphite/70" : "text-muted"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {items.length} találat: {filter}
      </p>

      <ul key={filter} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.title} className="pop-in card card-lift flex min-w-0 flex-col p-6" style={{ ["--i" as string]: i }}>
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-muted">{item.category}</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-ink">
                <Icon name="clock" className="size-3.5" aria-hidden="true" />
                {item.saved}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em]">{item.title}</h3>
            <p className="wrap-anywhere mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
