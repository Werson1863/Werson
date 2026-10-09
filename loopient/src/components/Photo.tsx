import photos from "@/generated/photos.json";

type PhotoId = keyof typeof photos;

/**
 * Reszponzív WebP fotó (srcset + sizes), lazy-loaddal és helyfoglaló háttérszínnel.
 * A fájlokat a scripts/build-assets.mjs generálja az assets/photos mappából.
 */
export function Photo({
  id,
  alt,
  sizes,
  className = "",
  priority = false,
}: {
  id: PhotoId;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const p = photos[id];
  const srcSet = p.widths.map((w) => `${p.base}-${w}.webp ${w}w`).join(", ");
  const fallback = `${p.base}-${p.widths.find((w) => w >= 960) ?? p.widths.at(-1)}.webp`;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- saját, előre generált srcset
    <img
      src={fallback}
      srcSet={srcSet}
      sizes={sizes}
      width={p.width}
      height={p.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={className}
      style={{ backgroundColor: p.placeholder }}
    />
  );
}
