import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Container } from "@/components/ui";

// JS nélküli űrlapbeküldés utáni oldal.
export const metadata: Metadata = {
  title: "Köszönjük az üzenetet",
  robots: { index: false, follow: true },
};

export default function ThanksPage() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-xl text-center">
        <span className="enter mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-700" aria-hidden="true">
          <Icon name="check" className="size-8" />
        </span>
        <h1 className="enter mt-8 text-[2.5rem] font-semibold sm:text-5xl" style={{ ["--i" as string]: 1 }}>
          Köszönjük, megkaptuk!
        </h1>
        <p className="enter mt-5 text-lg leading-relaxed text-muted" style={{ ["--i" as string]: 2 }}>
          Egy munkanapon belül jelentkezünk a megadott e-mail címen, hogy egyeztessünk egy időpontot.
        </p>
        <div className="enter mt-10" style={{ ["--i" as string]: 3 }}>
          <Link href="/" className="btn btn-primary">
            Vissza a főoldalra
          </Link>
        </div>
      </Container>
    </section>
  );
}
