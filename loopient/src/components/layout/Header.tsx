"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/config/site";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Árnyék csak akkor, ha már tartalom fut a menü alatt.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-px" />
      <header
        className="glass sticky top-0 z-50"
        style={{
          boxShadow: scrolled || open ? "0 1px 0 rgb(15 17 21 / 0.06), 0 8px 24px -16px rgb(15 17 21 / 0.18)" : "none",
        }}
      >
        <a
          href="#tartalom"
          className="sr-only-focusable absolute left-4 top-2 z-50 rounded-full bg-orange px-4 py-2 text-sm font-semibold text-graphite"
        >
          Ugrás a tartalomra
        </a>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="-m-1 inline-flex min-h-[44px] items-center p-1" aria-label="Loopient – főoldal">
            <Logo className="h-7 w-auto sm:h-8" />
          </Link>

          <nav aria-label="Fő navigáció" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="nav-link" aria-current={isActive(item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/kapcsolat" className="btn btn-primary max-[359px]:hidden !px-4 text-sm sm:!px-5 sm:text-[0.9375rem]">
              Kérj ajánlatot
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="btn btn-secondary !px-3 md:hidden"
              aria-expanded={open}
              aria-controls="mobil-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "close" : "menu"} />
              <span className="sr-only">{open ? "Menü bezárása" : "Menü megnyitása"}</span>
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobil-menu" aria-label="Mobil navigáció" className="menu-panel border-t border-white/10 px-4 pb-5 pt-2 md:hidden">
            <ul className="flex flex-col">
              <li>
                <Link href="/" className="flex min-h-[48px] items-center text-lg font-semibold" aria-current={pathname === "/" ? "page" : undefined}>
                  Főoldal
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-[48px] items-center text-lg font-semibold aria-[current=page]:text-orange-ink"
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/kapcsolat" className="btn btn-primary mt-3 w-full">
              Kérj ajánlatot
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
