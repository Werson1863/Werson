// Egy helyen minden elérhetőség és márka-adat. A [szögletes] értékek helykitöltők – lásd TODO.md.
export const site = {
  name: "Loopient",
  slogan: "Business automation",
  legalName: "Loopient", // TODO: cégnév cégformával (pl. Loopient Kft.)
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://loopient.hu").replace(/\/$/, ""),
  locale: "hu_HU",
  description:
    "A Loopient magyar kis- és középvállalkozások ismétlődő irodai folyamatait automatizálja: riportok, számlák, dokumentumok és rendszerek közti adatmozgatás – kézi munka nélkül.",

  contact: {
    email: "[e-mail cím]",
    phone: "[telefonszám]",
    // tel: link – csak számjegyek és +, pl. "+36301234567"
    phoneHref: "",
    address: "[cím]",
    hours: "Hétfő–péntek, 9:00–17:00",
  },

  founder: {
    name: "Péter", // TODO: teljes név
    role: "Alapító, automatizálási tanácsadó",
  },

  // Logók a public/brand mappában (forrás: assets/logo). Ha más a fájlnév, itt írd át.
  logo: {
    onLight: "/brand/logo-horizontal-on-light.svg",
    onDark: "/brand/logo-horizontal-on-dark.svg",
    mark: "/brand/logo-mark.svg",
    favicon: "/brand/favicon.svg",
    width: 172,
    height: 40,
  },

  social: {
    linkedin: "", // TODO: https://www.linkedin.com/company/...
  },

  // Csak statikus exportnál (npm run build:static) kell: külső űrlap-végpont.
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact",
} as const;

export const nav = [
  { href: "/megoldasok", label: "Megoldások" },
  { href: "/rolunk", label: "Rólunk" },
  { href: "/kapcsolat", label: "Kapcsolat" },
] as const;

export const hasRealValue = (v: string) => v.trim() !== "" && !/^\[.*\]$/.test(v.trim());
