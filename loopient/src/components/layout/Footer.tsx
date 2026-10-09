import Link from "next/link";
import { hasRealValue, nav, site } from "@/config/site";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { Backdrop } from "@/components/Backdrop";

export function Footer() {
  const { email, phone, phoneHref, address } = site.contact;
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark relative isolate overflow-hidden bg-graphite text-white">
      <Backdrop variant="footer" />
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex min-h-[44px] items-center" aria-label="Loopient – főoldal">
              <Logo variant="onDark" className="h-8 w-auto" />
            </Link>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-dark">
              Üzleti folyamat-automatizálás magyar kis- és középvállalkozásoknak. Kevesebb kézi munka, kevesebb hiba,
              több idő a lényegesre.
            </p>
          </div>

          <nav aria-label="Lábléc navigáció">
            <h2 className="text-sm font-semibold tracking-normal text-white">Oldalak</h2>
            <ul className="mt-3">
              {[{ href: "/", label: "Főoldal" }, ...nav, { href: "/adatvedelem", label: "Adatkezelési tájékoztató" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-[44px] items-center text-[0.9375rem] text-muted-dark hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-normal text-white">Elérhetőség</h2>
            <ul className="mt-3 text-[0.9375rem] text-muted-dark">
              <li className="wrap-anywhere">
                {hasRealValue(email) ? (
                  <a href={`mailto:${email}`} className="inline-flex min-h-[44px] items-center gap-2 hover:text-white">
                    <Icon name="mail" className="size-4 shrink-0" /> {email}
                  </a>
                ) : (
                  <span className="inline-flex min-h-[44px] items-center gap-2">
                    <Icon name="mail" className="size-4 shrink-0" /> {email}
                  </span>
                )}
              </li>
              <li className="wrap-anywhere">
                {phoneHref ? (
                  <a href={`tel:${phoneHref}`} className="inline-flex min-h-[44px] items-center gap-2 hover:text-white">
                    <Icon name="phone" className="size-4 shrink-0" /> {phone}
                  </a>
                ) : (
                  <span className="inline-flex min-h-[44px] items-center gap-2">
                    <Icon name="phone" className="size-4 shrink-0" /> {phone}
                  </span>
                )}
              </li>
              <li className="wrap-anywhere">
                <span className="inline-flex min-h-[44px] items-center gap-2">
                  <Icon name="pin" className="size-4 shrink-0" /> {address}
                </span>
              </li>
              {site.social.linkedin && (
                <li>
                  <a href={site.social.linkedin} className="inline-flex min-h-[44px] items-center gap-2 hover:text-white" rel="me noopener">
                    <Icon name="linkedin" className="size-4 shrink-0" /> LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <span className="tnum">{year}</span> {site.legalName}. Minden jog fenntartva.
          </p>
          <p>{site.slogan}</p>
        </div>
      </div>
    </footer>
  );
}
