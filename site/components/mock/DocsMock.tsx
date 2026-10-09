import { Icon } from '@/components/Icon';
import { MockCard, StatusPill } from '@/components/mock/MockCard';
import { cx } from '@/lib/cx';

export type DocsMockData = { title: string; badge: string; filter: string; items: { name: string; meta: string; status: string; tone: string }[] };

/** Dokumentum mock-UI „Rád vár” jelzéssel. */
export function DocsMock({ mock }: { mock: DocsMockData }) {
  return (
    <MockCard title={mock.title} meta={mock.filter} badge={mock.badge}>
      <ul className="grid grid-cols-1 gap-2 p-3">
        {mock.items.map((d) => (
          <li
            key={d.name}
            className={cx(
              'flex items-center gap-3 rounded-md px-3 py-3',
              d.tone === 'wait' ? 'bg-orange-tint/70 shadow-[inset_0_0_0_1px_rgb(194_65_12_/_0.18)]' : 'bg-white',
            )}
          >
            <span className={cx('grid size-9 shrink-0 place-items-center rounded-[9px]', d.tone === 'wait' ? 'bg-white text-orange-deep' : 'bg-mist text-graphite')}>
              <Icon name="document" size={18} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold leading-snug" title={d.name}>{d.name}</span>
              <span className="block truncate text-xs text-subtle">{d.meta}</span>
            </span>
            <StatusPill tone={d.tone}>{d.status}</StatusPill>
          </li>
        ))}
      </ul>
    </MockCard>
  );
}
