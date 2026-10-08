import type { Metadata } from "next";
import { hasRealValue, site } from "@/config/site";

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} – ${site.slogan}` }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: ["/og.png"] },
  };
}

export function organizationJsonLd() {
  const { email, phone, phoneHref } = site.contact;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    slogan: site.slogan,
    description: site.description,
    url: site.url,
    logo: `${site.url}${site.logo.mark}`,
    image: `${site.url}/og.png`,
    areaServed: { "@type": "Country", name: "Magyarország" },
    knowsLanguage: "hu",
    founder: { "@type": "Person", name: site.founder.name, jobTitle: site.founder.role },
    ...(hasRealValue(email) ? { email } : {}),
    ...(phoneHref ? { telephone: phone } : {}),
    ...(site.social.linkedin ? { sameAs: [site.social.linkedin] } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["hu", "en"],
      url: `${site.url}/kapcsolat`,
      ...(hasRealValue(email) ? { email } : {}),
    },
  };
}
