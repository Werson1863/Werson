import { LegalPage } from '@/components/LegalPage';
import { Rich } from '@/components/Rich';
import { copy } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('imprint', '/impresszum');

export default function ImprintPage() {
  const p = copy.legal.imprint;
  return (
    <LegalPage title={p.title} notice={p.draftNotice}>
      <dl className="divide-y divide-graphite/10 border-y border-graphite/10">
        {p.rows.map((r) => (
          <div key={r.label} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
            <dt className="text-sm font-semibold">{r.label}</dt>
            <dd className="break-anywhere text-muted">
              <Rich>{r.value}</Rich>
            </dd>
          </div>
        ))}
      </dl>
    </LegalPage>
  );
}
