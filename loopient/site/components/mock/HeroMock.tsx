import { Icon } from '@/components/Icon';
import type { IconName } from '@/lib/brand.generated';
import { MockCard, StatusPill } from '@/components/mock/MockCard';

type Item = { time: string; icon: string; text: string; status: string; tone: string };

export function HeroMock({ mock }: { mock: { title: string; badge: string; date: string; items: Item[]; footer: string } }) {
  return (
    <MockCard title={mock.title} badge={mock.badge} meta={mock.date} className="shadow-lg">
      <ol className="divide-y divide-graphite/[0.06]">
        {mock.items.map((item, i) => (
          <li
            key={i}
            className="enter-slow flex items-center gap-3 px-5 py-3.5 sm:gap-4"
            style={{ animationDelay: `${250 + i * 90}ms` }}
          >
            <span className="w-11 shrink-0 text-sm font-medium text-muted tabular">{item.time}</span>
            <span className={`grid size-9 shrink-0 place-items-center rounded-full ${item.tone === 'wait' ? 'bg-orange-tint text-orange-deep' : 'bg-mist text-graphite'}`}>
              <Icon name={item.icon as IconName} size={18} />
            </span>
            <span className="min-w-0 flex-1 break-anywhere text-[0.9375rem] font-medium leading-snug">{item.text}</span>
            <span className="hidden sm:block">
              <StatusPill tone={item.tone}>{item.status}</StatusPill>
            </span>
            <span className="sm:hidden" role="img" aria-label={item.status}>
              {item.tone === 'wait' ? (
                <span className="block size-2.5 rounded-full bg-orange" />
              ) : (
                <Icon name="check" size={18} strokeWidth={2} className="text-success" />
              )}
            </span>
          </li>
        ))}
      </ol>
      <div className="flex items-center justify-between gap-3 bg-mist px-5 py-3 text-sm text-muted">
        <span className="tabular">{mock.footer}</span>
        <Icon name="time" size={18} className="text-subtle" />
      </div>
    </MockCard>
  );
}
