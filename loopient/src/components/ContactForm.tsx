"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/config/site";
import { LIMITS, TEAM_SIZES, normalize, validate, type FieldErrors } from "@/lib/contact";
import { Icon } from "@/components/Icon";

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "block w-full min-h-[48px] rounded-xl bg-white px-4 py-3 text-base text-graphite shadow-[0_0_0_1px_rgb(15_17_21/0.5)] placeholder:text-[#6b6f7b] outline-none focus-visible:shadow-[0_0_0_2px_var(--color-orange-ink)] focus-visible:outline-none aria-[invalid=true]:shadow-[0_0_0_2px_#b91c1c]";

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-[#b91c1c]">
      <Icon name="alert" className="mt-0.5 size-4 shrink-0" />
      <span className="wrap-anywhere">{msg}</span>
    </p>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [startedAt, setStartedAt] = useState(0);
  const [teamSize, setTeamSize] = useState("");

  useEffect(() => {
    setStartedAt(Date.now());
    // JS nélküli beküldés hibás visszairányítása: /kapcsolat?hiba=1
    if (new URLSearchParams(window.location.search).has("hiba")) {
      setStatus("error");
      setServerError("Az üzenet elküldése nem sikerült. Kérjük, ellenőrizd az adatokat, és próbáld újra.");
    }
  }, []);

  useEffect(() => {
    if (status === "success" || status === "error") statusRef.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, unknown>;
    const data = normalize({ ...raw, startedAt });
    const v = validate(data);
    setErrors(v);
    setServerError("");
    if (Object.keys(v).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(v)[0]}"]`);
      first?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(site.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: FieldErrors };
      if (res.ok && body.ok) {
        setStatus("success");
        form.reset();
        setTeamSize("");
        return;
      }
      if (body.errors) setErrors(body.errors);
      setServerError(body.error ?? "Kérjük, javítsd a megjelölt mezőket.");
      setStatus("error");
    } catch {
      setServerError("Hálózati hiba történt. Ellenőrizd a kapcsolatot, és próbáld újra.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="card faq-panel p-8 text-center outline-none sm:p-12">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-700" aria-hidden="true">
          <Icon name="check" className="size-7" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold">Köszönjük, megkaptuk!</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          Egy munkanapon belül jelentkezünk a megadott e-mail címen, hogy egyeztessünk egy időpontot.
        </p>
        <button type="button" className="btn btn-secondary mt-8" onClick={() => setStatus("idle")}>
          Új üzenet küldése
        </button>
      </div>
    );
  }

  const describedBy = (k: keyof FieldErrors, extra?: string) =>
    [errors[k] ? `${k}-hiba` : "", extra ?? ""].filter(Boolean).join(" ") || undefined;

  return (
    <form
      ref={formRef}
      id="urlap"
      action={site.contactEndpoint}
      method="post"
      noValidate
      onSubmit={onSubmit}
      className="card p-6 sm:p-10"
      aria-describedby="urlap-megjegyzes"
    >
      {status === "error" && serverError && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="faq-panel mb-6 flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-[#991b1b] outline-none">
          <Icon name="alert" className="mt-0.5 size-5 shrink-0" />
          <p className="wrap-anywhere">{serverError}</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor="name" className="mb-2 block text-sm font-semibold">
            Név <span className="text-orange-ink" aria-hidden="true">*</span>
          </label>
          <input id="name" name="name" type="text" autoComplete="name" required maxLength={LIMITS.name} aria-invalid={!!errors.name} aria-describedby={describedBy("name")} className={inputCls} />
          <FieldError id="name-hiba" msg={errors.name} />
        </div>
        <div className="min-w-0">
          <label htmlFor="email" className="mb-2 block text-sm font-semibold">
            E-mail cím <span className="text-orange-ink" aria-hidden="true">*</span>
          </label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={LIMITS.email} aria-invalid={!!errors.email} aria-describedby={describedBy("email")} className={inputCls} />
          <FieldError id="email-hiba" msg={errors.email} />
        </div>
        <div className="min-w-0 sm:col-span-2">
          <label htmlFor="company" className="mb-2 block text-sm font-semibold">
            Cég <span className="font-normal text-muted">(nem kötelező)</span>
          </label>
          <input id="company" name="company" type="text" autoComplete="organization" maxLength={LIMITS.company} aria-invalid={!!errors.company} aria-describedby={describedBy("company")} className={inputCls} />
          <FieldError id="company-hiba" msg={errors.company} />
        </div>

        <fieldset className="min-w-0 sm:col-span-2" aria-describedby={describedBy("teamSize")}>
          <legend className="mb-2 block text-sm font-semibold">
            Csapatméret <span className="font-normal text-muted">(nem kötelező)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {TEAM_SIZES.map((size) => (
              <label key={size} className="relative">
                <input
                  type="radio"
                  name="teamSize"
                  value={size}
                  checked={teamSize === size}
                  onChange={() => setTeamSize(size)}
                  onClick={() => teamSize === size && setTeamSize("")}
                  className="peer absolute inset-0 cursor-pointer opacity-0"
                />
                <span className="btn tnum btn-secondary !px-4 !text-sm !font-medium peer-checked:!bg-graphite peer-checked:!text-white peer-checked:before:!bg-ink-2 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange-ink peer-active:scale-[0.97]">
                  {size}
                </span>
              </label>
            ))}
          </div>
          <FieldError id="teamSize-hiba" msg={errors.teamSize} />
        </fieldset>

        <div className="min-w-0 sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-sm font-semibold">
            Üzenet <span className="text-orange-ink" aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            maxLength={LIMITS.message}
            placeholder="Pl. hetente 4 órát töltünk a számlák kézi rögzítésével, ezt szeretnénk kiváltani…"
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message")}
            className={`${inputCls} resize-y`}
          />
          <FieldError id="message-hiba" msg={errors.message} />
        </div>

        {/* Honeypot: képernyőolvasó és billentyűzet elől is rejtve */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Weboldal (ne töltsd ki)</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>
        <input type="hidden" name="startedAt" value={startedAt} />

        <div className="min-w-0 sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              name="consent"
              required
              aria-invalid={!!errors.consent}
              aria-describedby={describedBy("consent")}
              className="mt-0.5 size-5 shrink-0 cursor-pointer accent-orange-ink"
            />
            <span>
              Elolvastam és elfogadom az{" "}
              <Link href="/adatvedelem" className="link">
                adatkezelési tájékoztatót
              </Link>
              . <span className="text-orange-ink" aria-hidden="true">*</span>
            </span>
          </label>
          <FieldError id="consent-hiba" msg={errors.consent} />
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="urlap-megjegyzes" className="text-sm text-muted">
          A *-gal jelölt mezők kötelezők. Egy munkanapon belül válaszolunk.
        </p>
        <button type="submit" className="btn btn-primary" disabled={status === "sending"} aria-disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
              Küldés…
            </>
          ) : (
            <>
              Üzenet küldése <Icon name="arrowRight" className="arrow size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
