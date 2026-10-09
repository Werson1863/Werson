'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const KEY = 'lp-consent';
type Choice = 'granted' | 'denied';

const read = (): Choice | null => {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
};

function loadAnalytics(src: string, domain: string) {
  if (document.querySelector('script[data-lp-analytics]')) return;
  const s = document.createElement('script');
  s.src = src;
  s.defer = true;
  s.dataset.lpAnalytics = '';
  if (domain) s.dataset.domain = domain;
  document.head.appendChild(s);
}

/**
 * Hozzájárulás-kezelés. Csak akkor jelenik meg, ha van beállított analitika (NEXT_PUBLIC_ANALYTICS_SRC);
 * a script kizárólag „Engedélyezem” után töltődik be. A lábléc „Süti-beállítások” gombja újranyitja.
 */
export function ConsentBanner({
  src,
  domain,
  labels,
}: {
  src: string;
  domain: string;
  labels: { title: string; text: string; accept: string; decline: string; more: string };
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!src) return;
    const choice = read();
    if (choice === 'granted') loadAnalytics(src, domain);
    if (!choice) setVisible(true);
    const reopen = () => setVisible(true);
    window.addEventListener('lp:consent-open', reopen);
    return () => window.removeEventListener('lp:consent-open', reopen);
  }, [src, domain]);

  if (!src || !visible) return null;

  const decide = (choice: Choice) => {
    try {
      localStorage.setItem(KEY, choice);
    } catch {}
    if (choice === 'granted') loadAnalytics(src, domain);
    // visszavonáskor az oldal újratöltése biztosan leállítja a már betöltött scriptet
    else if (document.querySelector('script[data-lp-analytics]')) window.location.reload();
    setVisible(false);
  };

  return (
    <section
      aria-label={labels.title}
      className="enter fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-lg bg-white p-5 shadow-lg sm:inset-x-6 sm:bottom-6"
    >
      <h2 className="text-h4">{labels.title}</h2>
      <p className="mt-2 text-sm text-muted">
        {labels.text}{' '}
        <Link href="/adatkezeles#sutik" className="font-semibold text-orange-deep underline underline-offset-4">
          {labels.more}
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary btn-sm" onClick={() => decide('granted')}>
          {labels.accept}
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => decide('denied')}>
          {labels.decline}
        </button>
      </div>
    </section>
  );
}

export function ConsentSettingsButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event('lp:consent-open'))}>
      {label}
    </button>
  );
}
