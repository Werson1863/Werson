// Közös validáció – a kliens és a szerver ugyanezt futtatja (a szerver a mérvadó).

export const TEAM_SIZES = ["1–5 fő", "6–20 fő", "21–50 fő", "50+ fő"] as const;
export type TeamSize = (typeof TEAM_SIZES)[number];

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  teamSize: string;
  message: string;
  consent: boolean;
  /** honeypot – embernek láthatatlan, botok kitöltik */
  website: string;
  /** az űrlap megjelenítésének ideje (ms), túl gyors beküldés = bot */
  startedAt: number;
};

export type FieldErrors = Partial<Record<"name" | "email" | "company" | "teamSize" | "message" | "consent", string>>;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

export const LIMITS = { name: 100, email: 254, company: 120, message: 4000, messageMin: 10 } as const;

export function normalize(raw: Record<string, unknown>): ContactInput {
  const str = (v: unknown) => (typeof v === "string" ? v : "").trim();
  return {
    name: str(raw.name).replace(/\s+/g, " "),
    email: str(raw.email).toLowerCase(),
    company: str(raw.company).replace(/\s+/g, " "),
    teamSize: str(raw.teamSize),
    message: str(raw.message).replace(/\r\n/g, "\n"),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
    website: str(raw.website),
    startedAt: Number(raw.startedAt) || 0,
  };
}

export function validate(input: ContactInput): FieldErrors {
  const e: FieldErrors = {};
  if (input.name.length < 2) e.name = "Add meg a neved.";
  else if (input.name.length > LIMITS.name) e.name = `Legfeljebb ${LIMITS.name} karakter lehet.`;

  if (!input.email) e.email = "Add meg az e-mail címed.";
  else if (input.email.length > LIMITS.email || !EMAIL_RE.test(input.email)) e.email = "Ez nem tűnik érvényes e-mail címnek.";

  if (input.company.length > LIMITS.company) e.company = `Legfeljebb ${LIMITS.company} karakter lehet.`;

  if (input.teamSize && !(TEAM_SIZES as readonly string[]).includes(input.teamSize)) e.teamSize = "Válassz a megadott lehetőségek közül.";

  if (input.message.length < LIMITS.messageMin) e.message = "Írj pár mondatot arról, miben segíthetünk (legalább 10 karakter).";
  else if (input.message.length > LIMITS.message) e.message = `Legfeljebb ${LIMITS.message} karakter lehet.`;

  if (!input.consent) e.consent = "Az adatkezelési tájékoztató elfogadása szükséges.";
  return e;
}

/** Bot-gyanú: kitöltött honeypot vagy 3 mp-nél gyorsabb beküldés. */
export function looksLikeSpam(input: ContactInput, now = Date.now()) {
  if (input.website) return true;
  if (input.startedAt && now - input.startedAt < 3000) return true;
  return false;
}
