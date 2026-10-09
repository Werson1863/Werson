import { createElement } from 'react';
import { brand, type IconName } from '@/lib/brand.generated';

type Props = { name: IconName; size?: number; className?: string; strokeWidth?: number; label?: string };

/** Egységes vonalikon (24 px rács, 1,5 px vonal). Forrás: brand/icons – tools/build_brand.py */
export function Icon({ name, size = 24, className, strokeWidth = 1.5, label }: Props) {
  const els = brand.icons[name] as unknown as Array<[string, Record<string, string>]>;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {els.map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}
