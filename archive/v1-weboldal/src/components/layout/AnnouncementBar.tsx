import Link from "next/link";
import { Icon } from "@/components/Icon";

export function AnnouncementBar() {
  return (
    <div className="on-dark bg-graphite text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-x-3 px-4 py-2 text-center text-[0.8125rem] leading-snug sm:text-sm">
        <span className="relative hidden size-2 shrink-0 rounded-full text-orange sm:inline-block pulse-dot" aria-hidden="true">
          <span className="absolute inset-0 rounded-full bg-orange" />
        </span>
        <p className="wrap-anywhere">
          <span className="font-semibold">Ingyenes, 30 perces konzultáció</span>
          <span className="text-muted-dark"> – megnézzük, mit érdemes automatizálni nálatok.</span>{" "}
          <Link
            href="/kapcsolat"
            className="inline-flex items-center gap-1 py-1 font-semibold text-orange-light underline-offset-4 hover:underline"
          >
            Időpontot kérek
            <Icon name="arrowRight" className="size-3.5" />
          </Link>
        </p>
      </div>
    </div>
  );
}
