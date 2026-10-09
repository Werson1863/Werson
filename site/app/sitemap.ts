import type { MetadataRoute } from 'next';
import { siteConfig } from '@/site.config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<[string, number, MetadataRoute.Sitemap[number]['changeFrequency']]> = [
    ['/', 1, 'monthly'],
    ['/megoldasok', 0.9, 'monthly'],
    ['/rolunk', 0.7, 'yearly'],
    ['/kapcsolat', 0.8, 'yearly'],
    ['/adatkezeles', 0.2, 'yearly'],
    ['/impresszum', 0.2, 'yearly'],
  ];
  const lastModified = new Date();
  return routes.map(([path, priority, changeFrequency]) => ({
    url: `${siteConfig.url}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
