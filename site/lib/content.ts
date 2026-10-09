import raw from '@content/copy.json';
import { siteConfig } from '@/site.config';

// A szövegkönyv egyetlen forrása: ../content/copy.json. Itt csak a {email}, {phone}, {year} helyőrzőket töltjük ki.
const vars: Record<string, string> = {
  email: siteConfig.contact.email,
  phone: siteConfig.contact.phone,
  year: String(new Date().getFullYear()),
};

function fill<T>(value: T): T {
  if (typeof value === 'string') return value.replace(/\{(email|phone|year)\}/g, (_, k: string) => vars[k]) as T;
  if (Array.isArray(value)) return value.map(fill) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fill(v)])) as T;
  }
  return value;
}

export const copy = fill(raw);
export type Copy = typeof copy;

/** Egyszerű {n} jellegű behelyettesítés futásidőben. */
export const format = (s: string, values: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? String(values[k]) : m));
