import { PageHero } from '@/components/PageHero';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import { Rich } from '@/components/Rich';
import { copy } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { siteConfig, isPlaceholder } from '@/site.config';
import { sendContact } from './actions';

export const metadata = pageMetadata('contact', '/kapcsolat');

export default function ContactPage() {
  const c = copy.contact;
  const { email, phone } = siteConfig.contact;
  const details = [
    { icon: 'mail' as const, label: c.details.email, value: email, href: isPlaceholder(email) ? undefined : `mailto:${email}` },
    { icon: 'phone' as const, label: c.details.phone, value: phone, href: isPlaceholder(phone) ? undefined : `tel:${phone.replace(/\s/g, '')}` },
    { icon: 'map-pin' as const, label: c.details.area, value: c.details.areaValue },
  ];
  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} titleLines={c.hero.titleLines} lead={c.hero.lead} />
      <section className="pb-24 sm:pb-32" aria-label={c.form.title}>
        <div className="container-site grid grid-cols-1 items-start gap-8 lg:grid-cols-[7fr_5fr] lg:gap-12">
          <div className="card relative p-6 sm:p-10">
            <h2 className="text-h3 mb-8">{c.form.title}</h2>
            <ContactForm action={sendContact} copy={{ form: c.form, states: c.states }} />
          </div>
          <aside className="grid grid-cols-1 gap-4">
            <div className="rounded-lg bg-white p-6 shadow-ring sm:p-8">
              <h2 className="text-h4">{c.details.title}</h2>
              <ul className="mt-5 grid grid-cols-1 gap-4">
                {details.map((d) => (
                  <li key={d.label} className="flex items-start gap-4">
                    <span className="grid grid-cols-1 size-10 shrink-0 place-items-center rounded-[11px] bg-orange-tint text-orange-deep">
                      <Icon name={d.icon} size={20} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-subtle">{d.label}</span>
                      {d.href ? (
                        <a href={d.href} className="inline-flex min-h-8 items-center break-anywhere font-semibold underline-offset-4 hover:underline">
                          {d.value}
                        </a>
                      ) : (
                        <span className="block break-anywhere font-semibold">
                          <Rich>{d.value}</Rich>
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="on-dark rounded-lg bg-graphite p-6 text-white sm:p-8">
              <h2 className="text-h4">{c.next.title}</h2>
              <ol className="mt-5 grid grid-cols-1 gap-4">
                {c.next.steps.map((s, i) => (
                  <li key={s} className="flex items-start gap-4">
                    <span className="grid grid-cols-1 size-8 shrink-0 place-items-center rounded-full bg-orange text-sm font-semibold text-graphite tabular">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-on-dark-muted">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
