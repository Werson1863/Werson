import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { cx } from '@/lib/cx';

type Variant = 'primary' | 'secondary' | 'accent' | 'outline-dark' | 'outline-graphite';

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  arrow = false,
  size,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  size?: 'sm';
  className?: string;
}) {
  const cls = cx('btn', `btn-${variant}`, size === 'sm' && 'btn-sm', className);
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Icon name="arrow-right" size={18} strokeWidth={2} className="btn-icon" />}
    </>
  );
  if (/^(mailto:|tel:|https?:)/.test(href)) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
