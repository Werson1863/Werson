// Kapcsolati űrlap végpont (csak a normál, Node-os buildben; statikus exportnál kimarad – lásd next.config.ts).
import { site } from "@/config/site";
import { looksLikeSpam, normalize, validate, type ContactInput } from "@/lib/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Egyszerű, példányonkénti rate limit (serverless környezetben "best effort").
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function sendEmail(data: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Loopient weboldal <onboarding@resend.dev>";

  const rows: [string, string][] = [
    ["Név", data.name],
    ["E-mail", data.email],
    ["Cég", data.company || "–"],
    ["Csapatméret", data.teamSize || "–"],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nÜzenet:\n${data.message}`;
  const html = `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.5;color:#0F1115">
  <h2 style="margin:0 0 16px">Új érdeklődés a weboldalról</h2>
  <table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#545866">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join("")}</table>
  <p style="margin:20px 0 6px;color:#545866">Üzenet:</p>
  <p style="white-space:pre-wrap;margin:0">${escapeHtml(data.message)}</p>
</div>`;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL nincs beállítva – fejlesztői mód, az üzenet:\n" + text);
      return;
    }
    throw new Error("Hiányzó e-mail konfiguráció (RESEND_API_KEY, CONTACT_TO_EMAIL).");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: data.email,
      subject: `Új érdeklődés: ${data.name}${data.company ? ` (${data.company})` : ""}`,
      text,
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend hiba: ${res.status} ${await res.text().catch(() => "")}`);
}

export async function POST(request: Request) {
  const isJson = (request.headers.get("content-type") ?? "").includes("application/json");
  // JS nélküli (natív) beküldésnél átirányítunk, JS-es beküldésnél JSON-t adunk vissza.
  const reply = (status: number, body: Record<string, unknown>) =>
    isJson
      ? Response.json(body, { status })
      : Response.redirect(new URL(body.ok ? "/kapcsolat/koszonjuk" : "/kapcsolat?hiba=1#urlap", request.url), 303);

  let raw: Record<string, unknown>;
  try {
    raw = isJson ? await request.json() : Object.fromEntries(await request.formData());
  } catch {
    return reply(400, { ok: false, error: "Érvénytelen kérés." });
  }

  const data = normalize(raw);

  // Botnak "sikert" mutatunk, de nem küldünk semmit.
  if (looksLikeSpam(data)) return reply(200, { ok: true });

  const errors = validate(data);
  if (Object.keys(errors).length) return reply(422, { ok: false, errors });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return reply(429, { ok: false, error: "Túl sok próbálkozás. Kérjük, próbáld újra pár perc múlva." });
  }

  try {
    await sendEmail(data);
  } catch (err) {
    console.error("[contact]", err);
    return reply(502, {
      ok: false,
      error: `Az üzenetet most nem sikerült elküldeni. Kérjük, próbáld újra, vagy írj közvetlenül: ${site.contact.email}`,
    });
  }
  return reply(200, { ok: true });
}
