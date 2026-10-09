import type { CSSProperties } from "react";

/**
 * Díszítő háttérrétegek (CSS + inline SVG, képfájl nélkül).
 * A szülő szekción legyen `relative isolate overflow-hidden` – a réteg -z-10-en, a tartalom mögött ül.
 */
type Variant = "hero" | "page" | "soft" | "dots" | "glow" | "dark" | "cta" | "footer";

const orb = (style: CSSProperties & Record<`--${string}`, string>, className: string) => (
  <span className={`orb ${className}`} style={style} />
);

/** Koncentrikus „loop” gyűrűk – a márkanévre utaló motívum, lassan forgó szaggatott ívekkel. */
function LoopRings({ className = "", tone = "orange" }: { className?: string; tone?: "orange" | "white" }) {
  const c = tone === "orange" ? "#F97316" : "#FFFFFF";
  return (
    <svg viewBox="0 0 1000 1000" fill="none" className={className} aria-hidden="true" focusable="false">
      <g stroke={c}>
        <circle cx="500" cy="500" r="180" strokeOpacity="0.22" />
        <circle cx="500" cy="500" r="270" strokeOpacity="0.16" />
        <circle cx="500" cy="500" r="360" strokeOpacity="0.11" />
        <circle cx="500" cy="500" r="450" strokeOpacity="0.07" />
        <circle className="spin-slow" cx="500" cy="500" r="270" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="2 14" strokeLinecap="round" />
        <circle className="spin-slow-rev" cx="500" cy="500" r="360" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="120 360" strokeLinecap="round" />
      </g>
      {/* „csomópontok” a gyűrűkön – automatizált lépések */}
      <g className="spin-slow" style={{ transformOrigin: "500px 500px", transformBox: "view-box" }}>
        <circle cx="770" cy="500" r="6" fill={c} fillOpacity="0.55" />
        <circle cx="230" cy="500" r="4" fill={c} fillOpacity="0.35" />
      </g>
      <g className="spin-slow-rev" style={{ transformOrigin: "500px 500px", transformBox: "view-box" }}>
        <circle cx="500" cy="140" r="5" fill={c} fillOpacity="0.45" />
        <circle cx="500" cy="860" r="3.5" fill={c} fillOpacity="0.3" />
      </g>
    </svg>
  );
}

export function Backdrop({ variant }: { variant: Variant }) {
  const base = "pointer-events-none absolute inset-0 -z-10 overflow-hidden";
  // A fényfoltok ne vágódjanak le élesen a szekcióhatáron: lágy átmenet alul/felül.
  const fadeY = `${base} [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)]`;
  const fadeB = `${base} [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]`;
  switch (variant) {
    case "hero":
      return (
        <div aria-hidden="true" className={fadeB}>
          <div className="bg-grid mask-fade-top absolute inset-0" />
          {orb({ left: "50%", top: "-14rem", width: "44rem", height: "30rem", marginLeft: "-22rem", background: "rgb(249 115 22 / 0.3)", "--dx": "30px", "--dy": "20px" }, "")}
          {orb({ left: "-8rem", top: "18rem", width: "26rem", height: "26rem", background: "rgb(234 88 12 / 0.2)", "--dx": "60px", "--dy": "-40px" }, "")}
          {orb({ right: "-10rem", top: "8rem", width: "28rem", height: "28rem", background: "rgb(249 115 22 / 0.18)", "--dx": "-50px", "--dy": "40px" }, "")}
          <LoopRings className="absolute left-1/2 top-[-6rem] w-[64rem] max-w-none -translate-x-1/2 sm:top-[-9rem] sm:w-[78rem] [mask-image:radial-gradient(closest-side,#000_55%,transparent)]" />
        </div>
      );
    case "page":
      return (
        <div aria-hidden="true" className={fadeB}>
          <div className="bg-grid mask-fade-top absolute inset-0" />
          {orb({ left: "50%", top: "-12rem", width: "40rem", height: "24rem", marginLeft: "-20rem", background: "rgb(249 115 22 / 0.26)", "--dx": "40px", "--dy": "16px" }, "")}
          {orb({ right: "-8rem", top: "4rem", width: "22rem", height: "22rem", background: "rgb(234 88 12 / 0.16)", "--dx": "-40px", "--dy": "30px" }, "")}
          <LoopRings className="absolute left-1/2 top-[-18rem] w-[60rem] max-w-none -translate-x-1/2 opacity-80 [mask-image:radial-gradient(closest-side,#000_50%,transparent)]" />
        </div>
      );
    case "soft":
      return (
        <div aria-hidden="true" className={fadeY}>
          {orb({ left: "-12rem", top: "20%", width: "30rem", height: "30rem", background: "rgb(249 115 22 / 0.14)", "--dx": "50px", "--dy": "30px" }, "")}
          {orb({ right: "-12rem", top: "55%", width: "30rem", height: "30rem", background: "rgb(234 88 12 / 0.12)", "--dx": "-40px", "--dy": "-40px" }, "")}
          <div className="bg-dots absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,#000_15%,#000_85%,transparent)]" />
        </div>
      );
    case "dots":
      return (
        <div aria-hidden="true" className={base}>
          <div className="bg-dots mask-fade-center absolute inset-0" />
        </div>
      );
    case "glow":
      return (
        <div aria-hidden="true" className={fadeY}>
          <div className="bg-grid mask-fade-center absolute inset-0 opacity-80" />
          {orb({ left: "50%", top: "30%", width: "40rem", height: "28rem", marginLeft: "-20rem", background: "rgb(249 115 22 / 0.18)", "--dx": "40px", "--dy": "-20px" }, "")}
        </div>
      );
    case "dark":
      return (
        <div aria-hidden="true" className={base}>
          <div className="bg-grid-dark mask-fade-top absolute inset-0" />
          {orb({ left: "50%", top: "-16rem", width: "46rem", height: "26rem", marginLeft: "-23rem", background: "rgb(249 115 22 / 0.28)", "--dx": "30px", "--dy": "30px" }, "")}
          {orb({ right: "-14rem", bottom: "-10rem", width: "30rem", height: "30rem", background: "rgb(194 65 12 / 0.25)", "--dx": "-40px", "--dy": "-30px" }, "")}
        </div>
      );
    case "footer":
      return (
        <div aria-hidden="true" className={base}>
          <div className="bg-grid-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
          {orb({ left: "50%", top: "-18rem", width: "40rem", height: "22rem", marginLeft: "-20rem", background: "rgb(249 115 22 / 0.16)", "--dx": "30px", "--dy": "10px" }, "")}
        </div>
      );
    case "cta":
      return (
        <div aria-hidden="true" className={base}>
          <div className="bg-dots-light absolute inset-0 [mask-image:linear-gradient(115deg,#000,transparent_60%)]" />
          {orb({ right: "10%", top: "-8rem", width: "26rem", height: "26rem", background: "rgb(253 186 116 / 0.7)", "--dx": "-30px", "--dy": "30px" }, "")}
          {orb({ left: "-6rem", bottom: "-10rem", width: "24rem", height: "24rem", background: "rgb(194 65 12 / 0.45)", "--dx": "40px", "--dy": "-20px" }, "")}
          <LoopRings tone="white" className="absolute left-[-14rem] top-1/2 w-[46rem] max-w-none -translate-y-1/2 opacity-70" />
        </div>
      );
  }
}
