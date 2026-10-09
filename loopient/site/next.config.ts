import type { NextConfig } from 'next';
import path from 'node:path';

// A szövegkönyv (../content) és a fotó-manifeszt (../photos) a projekt gyökerén kívül van,
// ezért a Turbopack és a fájlkövetés gyökerét egy szinttel feljebb állítjuk.
const workspaceRoot = path.resolve(__dirname, '..');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: { root: workspaceRoot },
  outputFileTracingRoot: workspaceRoot,
  images: { unoptimized: true },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/(fonts|photos|brand)/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },
};

export default nextConfig;
