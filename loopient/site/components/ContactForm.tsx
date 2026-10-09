'use client';

import Link from 'next/link';
import { useActionState, useEffect, useId, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Rich } from '@/components/Rich';
import type { ContactField, ContactState } from '@/lib/contact';
import { cx } from '@/lib/cx';

type FieldCopy = { label: string; placeholder?: string; autocomplete?: string; optional?: string; hint?: string };
export type ContactFormCopy = {
  form: {
    name: FieldCopy; email: FieldCopy; company: FieldCopy; message: FieldCopy;
    teamSize: { label: string; optional: string; options: string[] };
    honeypot: { label: string };
    consent: { before: string; link: string; after: string };
    submit: string; submitting: string; required: string;
  };
  states: { successTitle: string; successText: string; successAgain: string; errorTitle: string; validationTitle: string };
};

type Action = (state: ContactState, fd: FormData) => Promise<ContactState>;

/** Kapcsolati űrlap: szerveroldali validáció, JS nélkül is beküldhető (progresszív javítás). */
export function ContactForm({ action, copy }: { action: Action; copy: ContactFormCopy }) {
  const [state, formAction, pending] = useActionState(action, { status: 'idle' });
  const [startedAt, setStartedAt] = useState('');
  const [dismissed, setDismissed] = useState<number | undefined>();
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const f = copy.form;
  const v = state.values;
  const err = state.errors ?? {};

  useEffect(() => setStartedAt(String(Date.now())), [state.ts]);

  useEffect(() => {
    if (state.status === 'invalid') {
      const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      (first ?? summaryRef.current)?.focus();
    } else if (state.status === 'error') summaryRef.current?.focus();
    else if (state.status === 'success') successRef.current?.focus();
  }, [state]);

  if (state.status === 'success' && dismissed !== state.ts) {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="enter flex flex-col items-start rounded-lg bg-success-tint p-8 outline-none">
        <span className="grid grid-cols-1 size-12 place-items-center rounded-full bg-white text-success shadow-sm">
          <Icon name="check" size={24} strokeWidth={2} />
        </span>
        <h2 className="text-h3 mt-5">{copy.states.successTitle}</h2>
        <p className="mt-2 text-muted">
          <Rich>{copy.states.successText}</Rich>
        </p>
        <button type="button" className="btn btn-secondary btn-sm mt-6" onClick={() => setDismissed(state.ts)}>
          {copy.states.successAgain}
        </button>
      </div>
    );
  }

  const id = (k: string) => `${uid}-${k}`;
  const describedBy = (k: ContactField, extra?: string) => cx(err[k] && id(`${k}-err`), extra) || undefined;
  const ErrorText = ({ k }: { k: ContactField }) =>
    err[k] ? (
      <p id={id(`${k}-err`)} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-danger">
        <span aria-hidden>!</span>
        {err[k]}
      </p>
    ) : null;
  const Req = () => (
    <span className="ml-1 text-orange-deep" aria-hidden title={f.required}>
      *
    </span>
  );

  return (
    <form ref={formRef} key={state.ts ?? 0} action={formAction} noValidate className="grid grid-cols-1 gap-6" aria-describedby={state.status !== 'idle' ? id('summary') : undefined}>
      {(state.status === 'invalid' || state.status === 'error') && (
        <div
          id={id('summary')}
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-md bg-danger-tint px-5 py-4 text-sm text-danger outline-none"
        >
          <p className="font-semibold">{state.status === 'invalid' ? copy.states.validationTitle : copy.states.errorTitle}</p>
          {state.message && (
            <p className="mt-1 break-anywhere">
              <Rich>{state.message}</Rich>
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor={id('name')} className="field-label">
            {f.name.label}
            <Req />
          </label>
          <input
            id={id('name')}
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete={f.name.autocomplete}
            placeholder={f.name.placeholder}
            defaultValue={v?.name}
            aria-invalid={!!err.name}
            aria-describedby={describedBy('name')}
            className="field"
          />
          <ErrorText k="name" />
        </div>
        <div className="min-w-0">
          <label htmlFor={id('email')} className="field-label">
            {f.email.label}
            <Req />
          </label>
          <input
            id={id('email')}
            name="email"
            type="email"
            inputMode="email"
            required
            maxLength={254}
            autoComplete={f.email.autocomplete}
            placeholder={f.email.placeholder}
            defaultValue={v?.email}
            aria-invalid={!!err.email}
            aria-describedby={describedBy('email')}
            className="field"
            spellCheck={false}
          />
          <ErrorText k="email" />
        </div>
      </div>

      <div className="min-w-0">
        <label htmlFor={id('company')} className="field-label">
          {f.company.label} <span className="font-normal text-subtle">({f.company.optional})</span>
        </label>
        <input
          id={id('company')}
          name="company"
          type="text"
          maxLength={120}
          autoComplete={f.company.autocomplete}
          placeholder={f.company.placeholder}
          defaultValue={v?.company}
          aria-invalid={!!err.company}
          aria-describedby={describedBy('company')}
          className="field"
        />
        <ErrorText k="company" />
      </div>

      <fieldset className="min-w-0" aria-describedby={describedBy('teamSize')}>
        <legend className="field-label">
          {f.teamSize.label} <span className="font-normal text-subtle">({f.teamSize.optional})</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {f.teamSize.options.map((opt) => (
            <label key={opt} className="chip tabular">
              <input type="radio" name="teamSize" value={opt} defaultChecked={v?.teamSize === opt} className="sr-only" />
              {opt}
            </label>
          ))}
        </div>
        <ErrorText k="teamSize" />
      </fieldset>

      <div className="min-w-0">
        <label htmlFor={id('message')} className="field-label">
          {f.message.label}
          <Req />
        </label>
        <textarea
          id={id('message')}
          name="message"
          required
          rows={6}
          maxLength={4000}
          placeholder={f.message.placeholder}
          defaultValue={v?.message}
          aria-invalid={!!err.message}
          aria-describedby={describedBy('message', id('message-hint'))}
          className="field min-h-36 resize-y"
        />
        <p id={id('message-hint')} className="mt-2 text-sm text-subtle">
          {f.message.hint}
        </p>
        <ErrorText k="message" />
      </div>

      {/* Honeypot: képernyőolvasó és billentyűzet elől is rejtve */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id('website')}>{f.honeypot.label}</label>
        <input id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input type="hidden" name="t" value={startedAt} />

      <div className="min-w-0">
        <label className="flex min-h-11 cursor-pointer items-start gap-3">
          <input
            name="consent"
            type="checkbox"
            required
            defaultChecked={v?.consent}
            aria-invalid={!!err.consent}
            aria-describedby={describedBy('consent')}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-graphite"
          />
          <span className="text-[0.9375rem] leading-relaxed text-muted">
            {f.consent.before}
            <Link href="/adatkezeles" className="font-semibold text-orange-deep underline underline-offset-4" target="_blank">
              {f.consent.link}
            </Link>
            {f.consent.after}
            <Req />
          </span>
        </label>
        <ErrorText k="consent" />
      </div>

      <div>
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={pending} aria-disabled={pending}>
          <span>{pending ? f.submitting : f.submit}</span>
          {!pending && <Icon name="arrow-right" size={18} strokeWidth={2} className="btn-icon" />}
        </button>
      </div>
    </form>
  );
}
