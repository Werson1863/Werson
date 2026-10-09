// content/copy.json → content/copy.md (olvasható szövegkönyv). Futtatás: node tools/build_copy_md.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const c = JSON.parse(readFileSync(resolve(root, 'content/copy.json'), 'utf8'));
const out = [];
const h = (n, t) => out.push('', `${'#'.repeat(n)} ${t}`, '');
const p = (t) => out.push(t, '');
const li = (items) => { for (const i of items) out.push(`- ${i}`); out.push(''); };
const kv = (obj) => li(Object.entries(obj).map(([k, v]) => `**${k}:** ${typeof v === 'string' ? v : JSON.stringify(v)}`));
const lines = (arr) => arr.join(' / ');

out.push('# Loopient – szövegkönyv', '', '> Generált fájl a `content/copy.json`-ból (`node tools/build_copy_md.mjs`). A weboldal a JSON-t használja; szerkeszteni ott kell.', '> `[TODO: …]` = kitöltendő. `{email}`, `{phone}` = a `site/site.config.ts`-ből töltődik. A mock-UI adatok PÉLDÁK, nem állítások.');

h(2, 'Márka');
kv({ Név: c.brand.name, Alcím: `${c.brand.descriptor} / ${c.brand.descriptorHu}`, 'Jogi név': c.brand.legalName, Szlogen: c.brand.slogan, Terület: c.brand.area });
h(3, 'Pozicionálás'); p(c.brand.positioning);
h(3, 'Ígéret'); p(c.brand.promise);
h(3, 'Alapelvek'); li(c.brand.principles.map((x) => `**${x.title}.** ${x.text}`));
h(3, 'Szlogenjavaslatok'); li(c.brand.slogans.map((s) => (s.recommended ? `**${s.text}** ← ajánlott. ${s.why}` : s.text)));
h(3, 'Bemutatkozók');
p(`**1 mondat (e-mail lábléc, profil-alcím):** ${c.brand.bios.oneSentence}`);
p(`**~50 szó (LinkedIn „Névjegy”, rövid céges leírás):** ${c.brand.bios.fiftyWords}`);
p(`**~150 szó (weboldal, LinkedIn céges oldal):**\n\n${c.brand.bios.hundredFiftyWords}`);
p(`**LinkedIn címsor:** ${c.brand.bios.linkedinHeadline}`);
p(`**E-mail lábléc:** ${c.brand.bios.emailFooter}`);

h(2, 'Meta (title / description)');
out.push('| Oldal | Title | Description |', '|---|---|---|');
for (const [k, v] of Object.entries(c.meta.pages)) out.push(`| ${k} | ${v.title} | ${v.description} |`);
out.push('');
p(`Title-sablon: \`${c.meta.titleTemplate}\` · OG alt: ${c.meta.ogImageAlt}`);

h(2, 'Navigáció és announcement sáv');
li(c.nav.items.map((i) => `${i.label} → ${i.href}`));
p(`CTA: ${c.nav.cta.label} · Skip link: ${c.nav.skipLink} · Menü: ${c.nav.openMenu} / ${c.nav.closeMenu}`);
p(`Announcement: ${c.announcement.text} — [${c.announcement.link.label}](${c.announcement.link.href})`);

const H = c.home;
h(2, 'Főoldal');
h(3, 'Hero');
kv({ Eyebrow: H.hero.eyebrow, Cím: lines(H.hero.titleLines), Lead: H.hero.lead, 'Elsődleges gomb': H.hero.primary.label, 'Másodlagos gomb': H.hero.secondary.label, Megjegyzés: H.hero.note });
p(`Mock-UI „${H.hero.mock.title}” (${H.hero.mock.badge}):`);
li(H.hero.mock.items.map((i) => `${i.time} · ${i.text} — ${i.status}`));
h(3, `${H.featuresIntro.eyebrow}: ${H.featuresIntro.title}`); p(H.featuresIntro.lead);
for (const f of H.features) {
  h(4, `${f.eyebrow} – ${f.title}`); p(f.text); li(f.bullets);
}
h(3, `${H.processes.eyebrow}: ${H.processes.title}`); p(H.processes.lead);
p(`Szűrő chipek: ${[H.processes.all, ...H.processes.categories.map((x) => x.label)].join(' · ')}`);
const cat = Object.fromEntries(H.processes.categories.map((x) => [x.id, x.label]));
li(H.processes.items.map((i) => `**${i.title}** (${cat[i.category]}) – ${i.text}`));
h(3, `${H.integrations.eyebrow}: ${H.integrations.title}`); p(H.integrations.lead); p(H.integrations.items.join(' · ') + ` ${H.integrations.more}`); p(H.integrations._todo);
h(3, `${H.process.eyebrow}: ${H.process.title}`); p(H.process.lead);
li(H.process.steps.map((s) => `**${s.number} ${s.title}** – ${s.text} _${s.result}_`));
h(3, `${H.principles.eyebrow}: ${H.principles.title}`); p('(A három alapelv a Márka szakaszból.)');
h(3, `${H.aboutTeaser.eyebrow}: ${H.aboutTeaser.title}`); p(H.aboutTeaser.text); p(`Link: ${H.aboutTeaser.link.label}`);
h(3, `${H.faqIntro.eyebrow}: ${H.faqIntro.title}`); p(H.faqIntro.lead);
h(3, `Záró CTA: ${H.cta.title}`); p(H.cta.text); p(`Gombok: ${H.cta.primary.label} · ${H.cta.secondary.label}`);

h(2, 'GYIK');
for (const f of c.faq.items) { h(4, f.q); p(f.a); }

const S = c.solutions;
h(2, 'Megoldások oldal');
kv({ Eyebrow: S.hero.eyebrow, Cím: lines(S.hero.titleLines), Lead: S.hero.lead });
for (const a of S.areas) {
  h(3, a.title);
  li([`**${S.labels.problem}:** ${a.problem}`, `**${S.labels.solution}:** ${a.solution}`, `**${S.labels.examples}:** ${a.examples.join(', ')}`]);
}
h(3, `${S.engagement.eyebrow}: ${S.engagement.title}`); p(S.engagement.lead);
li(S.engagement.items.map((i) => `**${i.title}** (${i.price}) – ${i.text} [${i.points.join('; ')}]`));
h(3, `CTA: ${S.cta.title}`); p(S.cta.text);

const A = c.about;
h(2, 'Rólunk oldal');
kv({ Eyebrow: A.hero.eyebrow, Cím: lines(A.hero.titleLines), Lead: A.hero.lead });
h(3, A.story.title); for (const x of A.story.paragraphs) p(x);
h(3, 'Alapító'); kv({ Név: A.founder.name, Szerep: A.founder.role, Bio: A.founder.bio, Idézet: A.founder.quote, 'Fotó alt (teljes alakos)': A.founder.photoAlt, 'Fotó alt (színes portré)': A.founder.portraitAlt, 'Fotó alt (ff portré)': c.home.cta.photoAlt, LinkedIn: A.founder.linkedin.href });
h(3, A.facts.title); li(A.facts.items.map((i) => `${i.label}: ${i.value}`));
h(3, `CTA: ${A.cta.title}`); p(A.cta.text);

const K = c.contact;
h(2, 'Kapcsolat oldal');
kv({ Eyebrow: K.hero.eyebrow, Cím: lines(K.hero.titleLines), Lead: K.hero.lead });
h(3, 'Űrlap');
li([
  `${K.form.name.label} (kötelező) – „${K.form.name.placeholder}”`,
  `${K.form.email.label} (kötelező) – „${K.form.email.placeholder}”`,
  `${K.form.company.label} (${K.form.company.optional})`,
  `${K.form.teamSize.label} – chipek: ${K.form.teamSize.options.join(' · ')}`,
  `${K.form.message.label} (kötelező) – súgó: ${K.form.message.hint}`,
  `Hozzájárulás: ${K.form.consent.before}${K.form.consent.link}${K.form.consent.after}`,
  `Gomb: ${K.form.submit} → küldés közben: ${K.form.submitting}`,
]);
h(3, 'Űrlap-állapotok'); kv(K.states);
h(3, 'Hibaüzenetek'); kv(K.errors);
h(3, 'Oldalsáv'); p(`${K.details.title}: ${K.details.email}, ${K.details.phone}, ${K.details.area} – ${K.details.areaValue}`); p(`${K.next.title}`); li(K.next.steps);

h(2, 'Jogi oldalak (vázlat)');
h(3, c.legal.privacy.title); p(c.legal.privacy.draftNotice);
for (const s of c.legal.privacy.sections) { h(4, s.title); for (const x of s.paragraphs) p(x); }
h(3, c.legal.imprint.title); li(c.legal.imprint.rows.map((r) => `${r.label}: ${r.value}`));

h(2, 'Süti-sáv'); kv(c.consent);
h(2, 'Lábléc'); p(`${c.footer.tagline} · ${c.footer.copyright} · ${c.footer.madeIn}`);
h(2, 'Mikroszövegek');
h(3, 'Gombok'); kv(c.micro.buttons);
h(3, 'Akadálymentesség'); kv(Object.fromEntries(Object.entries(c.micro.a11y).filter(([, v]) => v)));
h(3, '404'); kv(c.micro.notFound);

writeFileSync(resolve(root, 'content/copy.md'), out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n');
console.log('content/copy.md kész');
