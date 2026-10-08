import type { Metadata } from "next";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Adatkezelési tájékoztató",
  description: "Hogyan kezeli a Loopient a kapcsolati űrlapon megadott személyes adatokat.",
  path: "/adatvedelem",
});

// TODO: jogász által ellenőrzött, végleges adatkezelési tájékoztató – lásd TODO.md
export default function PrivacyPage() {
  const { email, address } = site.contact;
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <p className="eyebrow enter">Jogi információk</p>
        <h1 className="enter mt-4 text-[2.5rem] font-semibold sm:text-5xl" style={{ ["--i" as string]: 1 }}>
          Adatkezelési tájékoztató
        </h1>
        <div
          className="enter mt-10 space-y-8 text-[1.0625rem] leading-relaxed text-muted [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-graphite [&_p]:mt-3"
          style={{ ["--i" as string]: 2 }}
        >
          <div className="rounded-xl bg-orange-wash p-4 text-[0.9375rem] text-graphite">
            Ez egy előzetes, általános tájékoztató. Élesítés előtt jogi szakemberrel véglegesítendő.
          </div>
          <div>
            <h2>Az adatkezelő</h2>
            <p>
              {site.legalName}, cím: {address}, e-mail: <span className="wrap-anywhere">{email}</span>.
            </p>
          </div>
          <div>
            <h2>Milyen adatokat kezelünk?</h2>
            <p>
              A kapcsolati űrlapon megadott nevet, e-mail címet, cégnevet, csapatméretet és az üzenet tartalmát.
              Az oldal nem használ követő vagy marketing sütiket.
            </p>
          </div>
          <div>
            <h2>Mi a célja és jogalapja?</h2>
            <p>
              Az adatokat kizárólag a megkeresésedre adott válasz és az ajánlatadás céljából kezeljük, a hozzájárulásod
              alapján (GDPR 6. cikk (1) a) pont), illetve szerződéskötést megelőző lépésként (6. cikk (1) b) pont).
            </p>
          </div>
          <div>
            <h2>Meddig őrizzük?</h2>
            <p>
              Az utolsó kapcsolatfelvételtől számított legfeljebb 12 hónapig, illetve szerződéskötés esetén a
              jogszabályban előírt ideig.
            </p>
          </div>
          <div>
            <h2>Adatfeldolgozók</h2>
            <p>
              Az űrlap üzeneteit a Resend (Resend, Inc.) e-mail szolgáltatáson keresztül továbbítjuk, a weboldalt a(z)
              [tárhelyszolgáltató] infrastruktúrája szolgálja ki.
            </p>
          </div>
          <div>
            <h2>Jogaid</h2>
            <p>
              Kérheted az adataidhoz való hozzáférést, azok helyesbítését, törlését vagy kezelésük korlátozását, és
              bármikor visszavonhatod a hozzájárulásodat a fenti e-mail címen. Panasszal a Nemzeti Adatvédelmi és
              Információszabadság Hatósághoz (NAIH, naih.hu) fordulhatsz.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
