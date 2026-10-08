import type { SVGProps } from "react";

// Kis, saját ikonkészlet (24×24, 1.75 vonalvastagság) – nincs külső ikon-függőség.
const paths = {
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  sparkle: <path d="M12 3.5 13.8 9a1 1 0 0 0 .7.7l5.5 1.8-5.5 1.8a1 1 0 0 0-.7.7L12 19.5 10.2 14a1 1 0 0 0-.7-.7L4 11.5l5.5-1.8a1 1 0 0 0 .7-.7L12 3.5Z" />,
  table: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17M3.5 14.5h17M9.5 9.5v10" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
  cart: (
    <>
      <path d="M3.5 4.5h2.2l2 10.5h10.3l2-7.5H7" />
      <circle cx="9.5" cy="19" r="1.25" />
      <circle cx="17" cy="19" r="1.25" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3.5h12v17l-2.5-1.5-2 1.5-1.5-1.5-1.5 1.5-2-1.5L6 20.5v-17Z" />
      <path d="M9 8.5h6M9 12h6M9 15.5h3" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8 12 3.5Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />
    </>
  ),
  chat: <path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 19 17h-8l-4.5 3.5V17H5a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 5 5.5Z" />,
  chart: <path d="M4 19.5h16M7 16v-5M12 16V6.5M17 16v-8" />,
  doc: (
    <>
      <path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8L14 3.5Z" />
      <path d="M14 3.5V8h4.5M9 13h6M9 16.5h4" />
    </>
  ),
  sync: (
    <>
      <path d="M19.5 9A7.5 7.5 0 0 0 6 6.5L4.5 8M4.5 15A7.5 7.5 0 0 0 18 17.5l1.5-1.5" />
      <path d="M4.5 4v4h4M19.5 20v-4h-4" />
    </>
  ),
  shield: <path d="M12 3.5 19 6v5.5c0 4.3-2.9 7.6-7 9-4.1-1.4-7-4.7-7-9V6l7-2.5Z" />,
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.75" />
    </>
  ),
  ruler: <path d="M4 15.5 15.5 4l4.5 4.5L8.5 20 4 15.5ZM8 11.5l2 2M11 8.5l2 2M14 5.5l2 2" />,
  handshake: <path d="M3 11.5 7 7.5l3 1 2-1.5 5 5M3 11.5l5 5 1.5-1.5M21 11.5l-4-4h-3M14 13.5l-2 2M11.5 11l-2 2M16.5 16 15 17.5" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  phone: <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16.5 16.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2Z" />,
  pin: (
    <>
      <path d="M12 20.5s-6.5-5.4-6.5-10.5a6.5 6.5 0 0 1 13 0c0 5.1-6.5 10.5-6.5 10.5Z" />
      <circle cx="12" cy="10" r="2.25" />
    </>
  ),
  chevronDown: <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5.5M12 16.2v.3" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5v6M8 7.5v.2M11.5 16.5v-6M11.5 13c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5v3.5" />
    </>
  ),
  bolt: <path d="M13 3.5 5.5 13.5H12l-1 7 7.5-10H12l1-7Z" />,
  users: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.5-3 2.7-4.8 5.5-4.8s5 1.8 5.5 4.8M15.5 5.7a3 3 0 0 1 0 5.6M17 14.4c2 .5 3.2 2 3.5 4.6" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "size-5", ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
