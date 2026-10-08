import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Az oldal nem található", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-xl text-center">
        <p className="tnum enter text-sm font-semibold text-orange-ink">404</p>
        <h1 className="enter mt-4 text-[2.5rem] font-semibold sm:text-5xl" style={{ ["--i" as string]: 1 }}>
          Ezt az oldalt nem találjuk.
        </h1>
        <p className="enter mt-5 text-lg leading-relaxed text-muted" style={{ ["--i" as string]: 2 }}>
          Lehet, hogy elköltözött, vagy elgépelődött a cím. A főoldalról mindent elérsz.
        </p>
        <div className="enter mt-10 flex flex-col justify-center gap-3 sm:flex-row" style={{ ["--i" as string]: 3 }}>
          <Link href="/" className="btn btn-primary">
            Főoldal
          </Link>
          <Link href="/kapcsolat" className="btn btn-secondary">
            Kapcsolat
          </Link>
        </div>
      </Container>
    </section>
  );
}
