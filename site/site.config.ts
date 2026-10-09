// Elérhetőségek és webhely-szintű beállítások. A szögletes zárójeles értékek helykitöltők – [TODO].
export const siteConfig = {
  /** Kanonikus cím: NEXT_PUBLIC_SITE_URL env, alapértelmezés a tervezett domain. [TODO: végleges domain] */
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://loopient.hu').replace(/\/$/, ''),
  contact: {
    email: '[e-mail cím]', // [TODO] pl. hello@loopient.hu
    phone: '[telefonszám]', // [TODO] pl. +36 30 123 4567
  },
  social: {
    linkedin: '', // [TODO] céges LinkedIn oldal URL-je – üresen nem jelenik meg
  },
  address: { locality: 'Debrecen', region: 'Hajdú-Bihar', country: 'HU' },
  locale: 'hu_HU',
  themeColor: '#F9F9F8',
  analytics: {
    src: process.env.NEXT_PUBLIC_ANALYTICS_SRC || '',
    domain: process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN || '',
  },
} as const;

/** Igaz, ha az érték még helykitöltő (pl. "[e-mail cím]"). */
export const isPlaceholder = (v: string) => !v || /^\[.*\]$/.test(v.trim());
