import { Icon } from '@/components/Icon';
import { MockCard } from '@/components/mock/MockCard';

export type SyncMockData = { title: string; badge: string; nodes: { name: string; detail: string }[]; status: string; statusDetail: string; log: string[] };

/** Rendszerek szinkronja: három csomópont, köztük mozgó adatpontok (csak transform/opacity). */
export function SyncMock({ mock }: { mock: SyncMockData }) {
  return (
    <MockCard title={mock.title} badge={mock.badge}>
      <div className="p-5">
        <div className="relative grid grid-cols-3 gap-3">
          {/* összekötő vonal */}
          <div aria-hidden className="absolute inset-x-[16%] top-7 h-px bg-graphite/15">
            {[0, 1].map((i) => (
              <span
                key={i}
                className="absolute inset-0 [--travel:100%] [animation:travel_2.4s_var(--lp-ease)_infinite]"
                style={{ animationDelay: `${i * 1.2}s` }}
              >
                <span className="absolute -left-[3.5px] -top-[3px] size-[7px] rounded-full bg-orange" />
              </span>
            ))}
          </div>
          {mock.nodes.map((n) => (
            <div key={n.name} className="relative min-w-0 text-center">
              <span className="mx-auto grid grid-cols-1 size-14 place-items-center rounded-[16px] bg-white text-graphite shadow-md">
                <Icon name="systems" size={22} />
              </span>
              <p className="mt-3 truncate text-sm font-semibold">{n.name}</p>
              <p className="break-anywhere text-xs leading-snug text-subtle">{n.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3 rounded-md bg-success-tint px-4 py-3">
          <Icon name="sync" size={18} className="shrink-0 text-success" />
          <p className="min-w-0 text-sm">
            <span className="font-semibold text-success">{mock.status}</span>
            <span className="text-muted tabular"> · {mock.statusDetail}</span>
          </p>
        </div>
        <ul className="mt-3 grid grid-cols-1 gap-1.5">
          {mock.log.map((l) => (
            <li key={l} className="flex items-start gap-2 text-sm text-muted">
              <Icon name="check" size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-success" />
              <span className="break-anywhere">{l}</span>
            </li>
          ))}
        </ul>
      </div>
    </MockCard>
  );
}
