import type { MetadataRoute } from 'next';
import { copy } from '@/lib/content';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${copy.brand.name} – ${copy.brand.descriptorHu}`,
    short_name: copy.brand.name,
    description: copy.meta.defaultDescription,
    lang: 'hu',
    start_url: '/',
    display: 'browser',
    background_color: '#F9F9F8',
    theme_color: '#F9F9F8',
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { src: '/maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
