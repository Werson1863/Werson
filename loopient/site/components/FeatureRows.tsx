import { Icon } from '@/components/Icon';
import { ReportMock, type ReportMockData } from '@/components/mock/ReportMock';
import { DocsMock, type DocsMockData } from '@/components/mock/DocsMock';
import { SyncMock, type SyncMockData } from '@/components/mock/SyncMock';
import { copy } from '@/lib/content';
import { cx } from '@/lib/cx';

/** 3 feature-sor, váltakozó oldalon a mock-UI-val. */
export function FeatureRows() {
  const [report, docs, sync] = copy.home.features;
  const mocks = [
    <ReportMock key="r" mock={report.mock as ReportMockData} />,
    <DocsMock key="d" mock={docs.mock as DocsMockData} />,
    <SyncMock key="s" mock={sync.mock as SyncMockData} />,
  ];
  return (
    <div className="mt-14 grid grid-cols-1 gap-20 sm:mt-20 lg:gap-28">
      {copy.home.features.map((f, i) => (
        <article key={f.id} id={f.id} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20" aria-labelledby={`${f.id}-title`}>
          <div className={cx('min-w-0', i % 2 === 1 && 'lg:order-2')}>
            <p className="eyebrow text-orange-deep">{f.eyebrow}</p>
            <h3 id={`${f.id}-title`} className="mt-4 text-h2 break-anywhere">
              {f.title}
            </h3>
            <p className="text-lead mt-5 max-w-xl text-muted">{f.text}</p>
            <ul className="mt-7 grid grid-cols-1 gap-3">
              {f.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 grid grid-cols-1 size-6 shrink-0 place-items-center rounded-full bg-orange-tint text-orange-deep">
                    <Icon name="check" size={14} strokeWidth={2.25} />
                  </span>
                  <span className="font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-w-0">
            <div aria-hidden className="absolute -inset-x-2 -inset-y-5 -z-10 rounded-[32px] bg-mist sm:-inset-10 sm:rounded-[40px]" />
            <div className="mx-auto max-w-lg">{mocks[i]}</div>
          </div>
        </article>
      ))}
    </div>
  );
}
