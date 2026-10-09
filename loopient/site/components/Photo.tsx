import { photos, type PhotoName } from '@/lib/photos';
import { cx } from '@/lib/cx';

/** Reszponzív WebP fotó (800/1200/1600 px srcset). Forrás: tools/photos.py */
export function Photo({
  name,
  alt,
  sizes,
  className,
  priority = false,
}: {
  name: PhotoName;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const p = photos[name];
  const largest = p.widths[p.widths.length - 1];
  const [rw, rh] = p.ratio;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${p.src}-${p.widths[0]}.webp`}
      srcSet={p.widths.map((w) => `${p.src}-${w}.webp ${w}w`).join(', ')}
      sizes={sizes}
      width={largest}
      height={Math.round((largest * rh) / rw)}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      className={cx('block h-auto w-full object-cover', className)}
      style={{ aspectRatio: `${rw} / ${rh}` }}
    />
  );
}
