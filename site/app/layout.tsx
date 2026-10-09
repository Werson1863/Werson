import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Announcement } from '@/components/Announcement';
import { SiteHeader } from '@/components/SiteHeader';
import { Footer } from '@/components/Footer';
import { ConsentBanner } from '@/components/ConsentBanner';
import { copy } from '@/lib/content';
import { siteConfig, isPlaceholder } from '@/site.config';

const inter = localFont({
  src: [
    { path: './fonts/Inter-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Inter-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Inter-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/Inter-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: copy.meta.defaultTitle, template: copy.meta.titleTemplate },
  description: copy.meta.defaultDescription,
  applicationName: copy.meta.siteName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    siteName: copy.meta.siteName,
    title: copy.meta.defaultTitle,
    description: copy.meta.defaultDescription,
    url: '/',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: copy.meta.ogImageAlt }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#F97316' } as never],
  },
  manifest: '/manifest.webmanifest',
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: 'device-width',
  initialScale: 1,
};

function organizationJsonLd() {
  const { email, phone } = siteConfig.contact;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: copy.brand.name,
    alternateName: `${copy.brand.name} – ${copy.brand.descriptorHu}`,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/loopient-mark-512.png`,
    image: `${siteConfig.url}/og.png`,
    slogan: copy.brand.slogan,
    description: copy.meta.defaultDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    areaServed: [
      { '@type': 'City', name: 'Debrecen' },
      { '@type': 'AdministrativeArea', name: 'Hajdú-Bihar vármegye' },
      { '@type': 'Country', name: 'Magyarország' },
    ],
    knowsLanguage: 'hu',
  };
  // helykitöltő elérhetőség nem kerül a strukturált adatba
  if (!isPlaceholder(email)) data.email = email;
  if (!isPlaceholder(phone)) data.telephone = phone;
  if (siteConfig.social.linkedin) data.sameAs = [siteConfig.social.linkedin];
  return data;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = copy.nav;
  return (
    <html lang="hu" className={inter.variable}>
      <body>
        <a href="#tartalom" className="sr-only-focusable fixed left-3 top-3 z-[60] rounded-full bg-graphite px-5 py-3 font-semibold text-white">
          {nav.skipLink}
        </a>
        <Announcement text={copy.announcement.text} link={copy.announcement.link} />
        <SiteHeader items={nav.items} cta={nav.cta} labels={nav} />
        <main id="tartalom" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <ConsentBanner src={siteConfig.analytics.src} domain={siteConfig.analytics.domain} labels={copy.consent} />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  );
}
