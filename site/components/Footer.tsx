import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Icon } from '@/components/Icon';
import { Rich } from '@/components/Rich';
import { ConsentSettingsButton } from '@/components/ConsentBanner';
import { copy } from '@/lib/content';
import { siteConfig, isPlaceholder } from '@/site.config';

export function Footer() {
  const f = copy.footer;
  const { email, phone } = siteConfig.contact;
  return (
    <footer className="on-dark relative overflow-hidden bg-graphite text-white">
      <div aria-hidden className="pattern-dark fade-bottom pointer-events-none absolute inset-x-0 top-0 h-64 opacity-60" />
      <div className="container-site relative pt-16 pb-10 sm:pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo variant="dark" className="h-10 w-auto" />
            <p className="mt-6 max-w-xs text-lg font-semibold tracking-tight">{f.tagline}</p>
            <p className="mt-2 text-sm text-on-dark-muted">{copy.brand.area}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {f.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="eyebrow text-on-dark-muted">{col.title}</h2>
                <ul className="mt-4 space-y-1">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="inline-flex min-h-11 items-center text-[0.9375rem] text-white/90 hover:text-orange-light sm:min-h-9">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <h2 className="eyebrow text-on-dark-muted">{f.contactTitle}</h2>
              <ul className="mt-4 space-y-1 text-[0.9375rem]">
                <li>
                  <a
                    href={isPlaceholder(email) ? '/kapcsolat' : `mailto:${email}`}
                    className="inline-flex min-h-11 items-center gap-2 break-anywhere text-white/90 hover:text-orange-light sm:min-h-9"
                  >
                    <Icon name="mail" size={18} className="shrink-0 text-orange-light" />
                    <Rich>{email}</Rich>
                  </a>
                </li>
                <li>
                  <a
                    href={isPlaceholder(phone) ? '/kapcsolat' : `tel:${phone.replace(/\s/g, '')}`}
                    className="inline-flex min-h-11 items-center gap-2 text-white/90 hover:text-orange-light sm:min-h-9"
                  >
                    <Icon name="phone" size={18} className="shrink-0 text-orange-light" />
                    <Rich>{phone}</Rich>
                  </a>
                </li>
                <li className="inline-flex min-h-11 items-center gap-2 text-white/90 sm:min-h-9">
                  <Icon name="map-pin" size={18} className="shrink-0 text-orange-light" />
                  Debrecen
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{f.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>{f.madeIn}</span>
            {siteConfig.analytics.src && (
              <ConsentSettingsButton label={copy.consent.settings} className="min-h-11 underline-offset-4 hover:text-white hover:underline" />
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
