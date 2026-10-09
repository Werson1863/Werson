import type { Metadata } from "next";
import { hasRealValue, site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";
import { Icon, type IconName } from "@/components/Icon";
import { Container, PageHero } from "@/components/ui";
import { Backdrop } from "@/components/Backdrop";

export const metadata: Metadata = pageMetadata({
  title: "Kapcsolat – kérj ingyenes konzultációt",
  description:
    "Írd meg, melyik folyamat visz el túl sok időt, és egy munkanapon belül jelentkezünk egy ingyenes, 30 perces konzultációval.",
  path: "/kapcsolat",
});

const steps = [
  { title: "Válaszolunk", body: "Egy munkanapon belül jelentkezünk, és egyeztetünk egy időpontot." },
  { title: "30 perces beszélgetés", body: "Átnézzük, hol veszít időt a csapatod, és mi automatizálható." },
  { title: "Javaslat és árajánlat", body: "Írásban kapsz konkrét javaslatot, időtervvel és fix árral." },
];

function ContactLine({ icon, label, value, href }: { icon: IconName; label: string; value: string; href?: string }) {
  const content = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange-wash text-orange-ink" aria-hidden="true">
        <Icon name={icon} className="size-5" />
      </span>
      <span className="wrap-anywhere">
        <span className="block text-xs font-medium text-muted">{label}</span>
        <span className="block font-semibold">{value}</span>
      </span>
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} className="flex min-h-[44px] items-center gap-3 hover:text-orange-ink">
          {content}
        </a>
      ) : (
        <span className="flex min-h-[44px] items-center gap-3">{content}</span>
      )}
    </li>
  );
}

export default function ContactPage() {
  const { email, phone, phoneHref, address, hours } = site.contact;
  return (
    <>
      <PageHero
        eyebrow="Kapcsolat"
        title="Beszéljünk a folyamataidról."
        lead="Írd meg röviden, melyik feladat visz el túl sok időt. Az első, 30 perces konzultáció ingyenes és kötelezettségmentes."
      />
      <section className="relative isolate overflow-hidden pb-20 sm:pb-28" aria-label="Kapcsolatfelvétel">
        <Backdrop variant="soft" />
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-12">
            <div className="min-w-0 enter" style={{ ["--i" as string]: 3 }}>
              <ContactForm />
            </div>
            <aside className="min-w-0 space-y-6 enter" style={{ ["--i" as string]: 4 }} aria-label="Elérhetőségek és következő lépések">
              <div className="card p-6">
                <h2 className="text-lg font-semibold tracking-[-0.02em]">Elérhetőségek</h2>
                <ul className="mt-4 space-y-3 text-[0.9375rem]">
                  <ContactLine icon="mail" label="E-mail" value={email} href={hasRealValue(email) ? `mailto:${email}` : undefined} />
                  <ContactLine icon="phone" label="Telefon" value={phone} href={phoneHref ? `tel:${phoneHref}` : undefined} />
                  <ContactLine icon="pin" label="Cím" value={address} />
                  <ContactLine icon="clock" label="Elérhetőség" value={hours} />
                </ul>
              </div>
              <div className="on-dark rounded-[1.25rem] bg-surface p-6 text-white shadow-[var(--shadow-card)]">
                <h2 className="text-lg font-semibold tracking-[-0.02em]">Mi történik ezután?</h2>
                <ol className="mt-5 space-y-5">
                  {steps.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span className="tnum grid size-8 shrink-0 place-items-center rounded-full bg-orange text-sm font-semibold text-graphite">
                        {i + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold">{s.title}</span>
                        <span className="block text-sm leading-relaxed text-muted-dark">{s.body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
