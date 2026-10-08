import type { NextConfig } from "next";

/**
 * Két build-mód:
 *  - alap (`npm run build`): Vercel / Node. Minden oldal statikusan előrenderelt (SSG),
 *    egyedül a kapcsolati űrlap `/api/contact` végpontja fut szerveroldalon.
 *  - statikus export (`npm run build:static`): tisztán statikus `out/` mappa bármilyen
 *    tárhelyre. Ilyenkor az API route kimarad (a `*.api.ts` kiterjesztés nem számít
 *    route-nak), az űrlap a NEXT_PUBLIC_CONTACT_ENDPOINT címre küld.
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const } : {}),
  pageExtensions: isStaticExport ? ["tsx", "ts"] : ["tsx", "ts", "api.ts"],
  trailingSlash: false,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true },
  ...(isStaticExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/:path*",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                { key: "X-Frame-Options", value: "DENY" },
                { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
              ],
            },
            {
              source: "/images/:path*",
              headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
            },
          ];
        },
      }),
};

export default nextConfig;
