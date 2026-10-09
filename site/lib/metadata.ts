import type { Metadata } from 'next';
import { copy } from '@/lib/content';
import { siteConfig } from '@/site.config';

type PageKey = keyof typeof copy.meta.pages;

const ogImage = { url: '/og.png', width: 1200, height: 630, alt: copy.meta.ogImageAlt };

/**
 * Oldalankénti title/description/canonical/OG a szövegkönyvből.
 * A Next.js az openGraph objektumot nem fésüli össze a layouttal, ezért itt a teljes OG-blokkot megadjuk.
 */
export function pageMetadata(key: PageKey, path: string): Metadata {
  const page = copy.meta.pages[key];
  const isHome = key === 'home';
  return {
    title: isHome ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      siteName: copy.meta.siteName,
      title: page.title,
      description: page.description,
      url: path,
      images: [ogImage],
    },
    twitter: { card: 'summary_large_image', title: page.title, description: page.description, images: [ogImage.url] },
  };
}
