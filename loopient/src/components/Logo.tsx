import { site } from "@/config/site";

export function Logo({ variant = "onDark", className = "h-8 w-auto" }: { variant?: "onLight" | "onDark"; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG logó, optimalizálás nem kell
    <img
      src={site.logo[variant]}
      width={site.logo.width}
      height={site.logo.height}
      alt={`${site.name} – ${site.slogan}`}
      className={className}
      decoding="async"
    />
  );
}
