'use client';

import { useId, useState } from 'react';
import { Icon } from '@/components/Icon';
import { MockCard } from '@/components/mock/MockCard';
import { cx } from '@/lib/cx';

export type ReportMockData = {
  title: string; subtitle: string; badge: string;
  rows: { label: string; value: string; delta: string }[];
  bars: number[];
  toggleLabel: string; toggleOn: string; toggleOff: string;
  action: string; recipients: string; autoSendNote: string;
};

/** Riport mock-UI jóváhagyás-kapcsolóval (role="switch", billentyűzettel is kezelhető). */
export function ReportMock({ mock }: { mock: ReportMockData }) {
  const [approve, setApprove] = useState(true);
  const labelId = useId();
  const max = Math.max(...mock.bars);
  return (
    <MockCard title={mock.title} meta={mock.subtitle} badge={mock.badge}>
      <div className="grid grid-cols-1 gap-5 p-5">
        <div className="flex h-24 items-end gap-2" aria-hidden>
          {mock.bars.map((b, i) => (
            <div key={i} className="flex h-full flex-1 items-end">
              <div
                className={cx('w-full origin-bottom rounded-t-[5px]', i === mock.bars.length - 1 ? 'bg-orange' : 'bg-graphite/[0.12]')}
                style={{ height: `${(b / max) * 100}%` }}
              />
            </div>
          ))}
        </div>
        <dl className="grid grid-cols-3 gap-2 sm:gap-3">
          {mock.rows.map((r) => (
            <div key={r.label} className="min-w-0 rounded-md bg-mist px-2.5 py-2.5 sm:px-3">
              <dt className="truncate text-xs text-muted">{r.label}</dt>
              <dd className="mt-0.5 text-[0.8125rem] font-semibold tracking-tight whitespace-nowrap tabular sm:text-[0.9375rem]">{r.value}</dd>
              <dd className={cx('text-xs font-semibold tabular', r.delta.startsWith('−') ? 'text-danger' : 'text-success')}>{r.delta}</dd>
            </div>
          ))}
        </dl>
        <div className="flex items-center justify-between gap-4 rounded-md bg-mist px-4 py-3">
          <span id={labelId} className="text-[0.9375rem] font-medium">
            {mock.toggleLabel}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={approve}
            aria-labelledby={labelId}
            onClick={() => setApprove((v) => !v)}
            className="relative inline-flex h-11 w-14 shrink-0 cursor-pointer items-center justify-center"
          >
            <span className="relative block h-7 w-12 overflow-hidden rounded-full bg-graphite/20">
              <span
                className={cx('absolute inset-0 bg-orange transition-opacity duration-200 ease-brand', approve ? 'opacity-100' : 'opacity-0')}
              />
              <span
                className={cx(
                  'absolute left-0.5 top-0.5 size-6 rounded-full bg-white shadow-sm transition-transform duration-200 ease-brand',
                  approve ? 'translate-x-5' : 'translate-x-0',
                )}
              />
            </span>
            <span className="sr-only">{approve ? mock.toggleOn : mock.toggleOff}</span>
          </button>
        </div>
        <div className="flex min-h-12 flex-wrap items-center justify-between gap-3" aria-live="polite">
          <span className="text-sm text-muted">{approve ? mock.recipients : mock.autoSendNote}</span>
          {approve && (
            <span className="btn btn-primary btn-sm pointer-events-none enter" aria-hidden>
              <Icon name="check" size={16} strokeWidth={2} />
              <span>{mock.action}</span>
            </span>
          )}
        </div>
      </div>
    </MockCard>
  );
}
