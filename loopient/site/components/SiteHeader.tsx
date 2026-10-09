'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Logo } from '@/components/Logo';
import { Icon } from '@/components/Icon';
import { cx } from '@/lib/cx';

type NavItem = { label: string; href: string };
type Labels = { homeLabel: string; openMenu: string; closeMenu: string; mainNavLabel: string };

/** Üvegszerű sticky menü. Mobilon nyitható panel: Esc bezárja, fókusz visszakerül a gombra. */
export function SiteHeader({ items, cta, labels }: { items: NavItem[]; cta: NavItem; labels: Labels }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open, close]);

  const isActive = (href: string) => !href.includes('#') && (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="glass sticky top-0 z-40">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={labels.homeLabel} className="-ml-1 flex min-h-11 items-center rounded-md px-1">
          <Logo className="h-8 w-auto sm:h-9" />
        </Link>

        <nav aria-label={labels.mainNavLabel} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cx(
                    'inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium text-muted',
                    'hover:text-graphite aria-[current=page]:text-graphite aria-[current=page]:font-semibold',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href={cta.href} className="btn btn-primary btn-sm hidden sm:inline-flex">
            <span>{cta.label}</span>
            <Icon name="arrow-right" size={16} strokeWidth={2} className="btn-icon" />
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="btn btn-secondary btn-sm size-11 !px-0 lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? labels.closeMenu : labels.openMenu}
            onClick={() => (open ? close() : setOpen(true))}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <div
        id={panelId}
        ref={panelRef}
        hidden={!open}
        className="enter border-t border-graphite/5 lg:hidden"
      >
        <nav aria-label={labels.mainNavLabel} className="container-site pb-5 pt-2">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => close(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className="flex min-h-12 items-center justify-between rounded-md text-lg font-semibold tracking-tight aria-[current=page]:text-orange-deep"
                >
                  {item.label}
                  <Icon name="arrow-right" size={18} className="text-subtle" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href={cta.href} onClick={() => close(false)} className="btn btn-primary mt-4 w-full sm:hidden">
            <span>{cta.label}</span>
            <Icon name="arrow-right" size={18} strokeWidth={2} className="btn-icon" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
