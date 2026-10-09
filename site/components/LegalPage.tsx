import { Rich } from '@/components/Rich';

export function LegalPage({ title, notice, updated, children }: { title: string; notice: string; updated?: string; children: React.ReactNode }) {
  return (
    <article className="container-site max-w-3xl pt-14 pb-24 sm:pt-20">
      <h1 className="text-h1">{title}</h1>
      {updated && (
        <p className="mt-4 text-sm text-subtle">
          <Rich>{updated}</Rich>
        </p>
      )}
      <p role="note" className="mt-6 rounded-md bg-orange-tint px-5 py-4 text-sm font-medium text-orange-deep">
        <Rich>{notice}</Rich>
      </p>
      <div className="mt-10 grid grid-cols-1 gap-10">{children}</div>
    </article>
  );
}
