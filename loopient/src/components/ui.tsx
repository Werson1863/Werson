import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { Backdrop } from "@/components/Backdrop";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "center",
  as: Tag = "h2",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  id?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl`} data-reveal>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag id={id} className="mt-3 text-[2rem] font-semibold sm:text-[2.75rem]">
        {title}
      </Tag>
      {lead && <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted on-dark:text-muted-dark">{lead}</p>}
    </div>
  );
}

export function ArrowLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "ghost-dark" | "dark";
  className?: string;
}) {
  return (
    <Link href={href} className={`btn btn-${variant} ${className}`}>
      {children}
      <Icon name="arrowRight" className="arrow size-4" />
    </Link>
  );
}

/** Aloldali hero – CSS belépő animációval. */
export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: ReactNode; lead: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden pb-12 pt-16 sm:pb-16 sm:pt-24">
      <Backdrop variant="page" />
      <Container className="text-center">
        <p className="eyebrow enter" style={{ ["--i" as string]: 0 }}>
          {eyebrow}
        </p>
        <h1 className="enter mx-auto mt-4 max-w-3xl text-[2.5rem] font-semibold sm:text-[4rem]" style={{ ["--i" as string]: 1 }}>
          {title}
        </h1>
        <p className="enter mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted" style={{ ["--i" as string]: 2 }}>
          {lead}
        </p>
        {children && (
          <div className="enter mt-8" style={{ ["--i" as string]: 3 }}>
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}
