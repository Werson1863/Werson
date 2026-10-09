import { cx } from '@/lib/cx';
import { Rich } from '@/components/Rich';

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'light',
  id,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  id?: string;
  className?: string;
}) {
  return (
    <div className={cx('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className={cx('eyebrow mb-4', tone === 'dark' ? 'text-orange-light' : 'text-orange-deep')}>{eyebrow}</p>}
      <h2 id={id} className={cx('text-h2 break-anywhere', tone === 'dark' ? 'text-white' : 'text-graphite')}>
        {title}
      </h2>
      {lead && (
        <p className={cx('text-lead mt-5', tone === 'dark' ? 'text-on-dark-muted' : 'text-muted', align === 'center' && 'mx-auto max-w-2xl')}>
          <Rich>{lead}</Rich>
        </p>
      )}
    </div>
  );
}
