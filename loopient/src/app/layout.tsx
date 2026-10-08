import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/config/site";
import { organizationJsonLd } from "@/lib/seo";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

// Saját, magyar karakterekre szűkített Inter variable font (lásd src/app/fonts/README.md).
const inter = localFont({
  src: "./fonts/InterHU-Variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Üzleti folyamat-automatizálás`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: site.logo.favicon, type: "image/svg+xml" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/brand/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: "/",
    title: `${site.name} – Üzleti folyamat-automatizálás`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} – ${site.slogan}` }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0F1115",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* A görgetéses reveal csak futó JS mellett rejti el előre az elemeket. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={organizationJsonLd()} />
      </head>
      <body className="min-h-dvh font-sans antialiased">
        <AnnouncementBar />
        <Header />
        <main id="tartalom" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
