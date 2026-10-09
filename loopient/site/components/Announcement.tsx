import Link from 'next/link';
import { Icon } from '@/components/Icon';

export function Announcement({ text, link }: { text: string; link: { label: string; href: string } }) {
  return (
    <div className="on-dark bg-graphite text-white">
      <div className="container-site flex min-h-10 flex-wrap items-center justify-center gap-x-3 gap-y-0 py-2 text-center text-sm">
        <span className="inline-flex items-center gap-2 text-on-dark-muted">
          <span aria-hidden className="hidden size-1.5 rounded-full bg-orange sm:block" />
          {text}
        </span>
        <Link href={link.href} className="group inline-flex min-h-6 items-center gap-1 font-semibold text-orange-light underline-offset-4 hover:underline">
          {link.label}
          <Icon name="arrow-right" size={16} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}
