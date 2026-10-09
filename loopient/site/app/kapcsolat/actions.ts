'use server';

import { headers } from 'next/headers';
import { copy, format } from '@/lib/content';
import { readValues, validate, type ContactState } from '@/lib/contact';

const c = copy.contact;

// Egyszerű, példányonkénti rate limit (szerverless környezetben csak „legjobb szándék” védelem).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_HITS;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);

export async function sendContact(_prev: ContactState, fd: FormData): Promise<ContactState> {
  const ts = Date.now();
  const values = readValues(fd);

  // Honeypot: robot töltötte ki → csendes „siker”, nem küldünk semmit
  if (String(fd.get('website') ?? '').trim() !== '') return { status: 'success', ts };

  // Időcsapda: 2,5 mp-en belüli beküldés emberi kitöltésnél nem reális
  const started = Number(fd.get('t'));
  if (Number.isFinite(started) && started > 0 && ts - started < 2500) {
    return { status: 'error', message: c.errors.tooFast, values, ts };
  }

  const errors = validate(values, c.errors, c.form.teamSize.options);
  if (Object.keys(errors).length) return { status: 'invalid', errors, values, ts };

  const h = await headers();
  const ip = (h.get('x-forwarded-for') ?? '').split(',')[0].trim() || h.get('x-real-ip') || 'ismeretlen';
  if (rateLimited(ip)) return { status: 'error', message: c.errors.rateLimited, values, ts };

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const L = c.email.labels;
  const when = new Date().toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' });
  const rows: Array<[string, string]> = [
    [L.name, values.name],
    [L.email, values.email],
    [L.company, values.company || '–'],
    [L.teamSize, values.teamSize || '–'],
    [L.consent, c.email.consentYes],
    [L.time, when],
  ];
  const subject = format(c.email.subject, { name: values.name }).slice(0, 150);
  const text = `${c.email.intro}\n\n${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${L.message}:\n${values.message}\n`;
  const html = `<div style="font-family:Inter,Arial,sans-serif;color:#0F1115;line-height:1.5">
<p>${esc(c.email.intro)}</p>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#4B5160">${esc(k)}</td><td><strong>${esc(v)}</strong></td></tr>`)
    .join('')}</table>
<p style="color:#4B5160;margin-top:16px">${esc(L.message)}:</p>
<p style="white-space:pre-wrap;background:#F5F5F7;padding:12px;border-radius:8px">${esc(values.message)}</p></div>`;

  if (!key || !to || !from) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[kapcsolat] Resend nincs beállítva – fejlesztői módban csak naplózzuk:\n' + text);
      return { status: 'success', ts };
    }
    console.error('[kapcsolat] Hiányzó env: RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL');
    return { status: 'error', message: c.states.notConfigured, values, ts };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: to.split(',').map((s) => s.trim()), reply_to: values.email, subject, text, html }),
      signal: AbortSignal.timeout(10_000),
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('[kapcsolat] Resend hiba', res.status, (await res.text()).slice(0, 500));
      return { status: 'error', message: c.states.errorText, values, ts };
    }
    return { status: 'success', ts };
  } catch (err) {
    console.error('[kapcsolat] Küldési hiba', err);
    return { status: 'error', message: c.states.errorText, values, ts };
  }
}
