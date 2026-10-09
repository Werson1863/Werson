import { LegalPage } from '@/components/LegalPage';
import { Rich } from '@/components/Rich';
import { copy } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('privacy', '/adatkezeles');

const ANCHORS = ['adatkezelo', 'adatok', 'adatfeldolgozok', 'sutik', 'jogok'];

export default function PrivacyPage() {
  const p = copy.legal.privacy;
  return (
    <LegalPage title={p.title} notice={p.draftNotice} updated={p.updated}>
      {p.sections.map((s, i) => (
        <section key={s.title} id={ANCHORS[i]} className="scroll-mt-28" aria-labelledby={`${ANCHORS[i]}-cim`}>
          <h2 id={`${ANCHORS[i]}-cim`} className="text-h3">
            {s.title}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 leading-relaxed text-muted">
            {s.paragraphs.map((t, j) => (
              <p key={j} className="break-anywhere">
                <Rich>{t}</Rich>
              </p>
            ))}
          </div>
        </section>
      ))}
    </LegalPage>
  );
}
