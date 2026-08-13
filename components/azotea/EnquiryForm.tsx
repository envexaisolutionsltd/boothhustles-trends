"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitEnquiry } from "@/app/azotea/actions";
import { initialEnquiryState, type EnquiryKind } from "@/lib/enquiry";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="az-btn az-btn-block" disabled={pending} aria-busy={pending}>
      {pending ? "Sending…" : label}
    </button>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="az-field">
      <label className="az-label" htmlFor={name}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="az-error" id={`${name}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function EnquiryForm({
  kind,
  submitLabel = "Send enquiry",
}: {
  kind: EnquiryKind;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(submitEnquiry, initialEnquiryState);
  const errors = state.fieldErrors;

  if (state.status === "success") {
    return (
      <div className="az-card" role="status" aria-live="polite">
        <p className="az-chip">Enquiry received</p>
        <p className="az-display az-h3 mt-5">Gracias.</p>
        <p className="az-body mt-3">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="az-card grid gap-5" noValidate>
      <input type="hidden" name="kind" value={kind} />
      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name}>
          <input
            id="name"
            name="name"
            className="az-input"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </Field>
        <Field label="Email" name="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            className="az-input"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" name="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="az-input"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </Field>

        {kind === "table" ? (
          <Field label="Guests" name="guests" error={errors.guests}>
            <input
              id="guests"
              name="guests"
              type="number"
              min={1}
              max={7}
              className="az-input"
              placeholder="1–7 (8+ is a group booking)"
            />
          </Field>
        ) : null}

        {kind === "group" ? (
          <Field label="Guests (8 or more)" name="guests" error={errors.guests}>
            <input
              id="guests"
              name="guests"
              type="number"
              min={8}
              className="az-input"
              placeholder="8+"
              aria-invalid={Boolean(errors.guests)}
              aria-describedby={errors.guests ? "guests-error" : undefined}
            />
          </Field>
        ) : null}

        {kind === "careers" ? (
          <Field label="Role you're interested in" name="role">
            <input
              id="role"
              name="role"
              className="az-input"
              placeholder="Front of house, bar, kitchen…"
            />
          </Field>
        ) : null}
      </div>

      {kind === "table" || kind === "group" ? (
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Date" name="date">
            <input id="date" name="date" type="date" className="az-input" />
          </Field>
          <Field label="Time" name="time">
            <input id="time" name="time" type="time" className="az-input" />
          </Field>
          <Field label={kind === "group" ? "Occasion" : "Where would you like to sit?"} name={kind === "group" ? "occasion" : "area"}>
            {kind === "group" ? (
              <input
                id="occasion"
                name="occasion"
                className="az-input"
                placeholder="Birthday, work do, private hire…"
              />
            ) : (
              <select id="area" name="area" className="az-select" defaultValue="">
                <option value="">No preference</option>
                <option value="Restaurant">Restaurant — full menu, table service</option>
                <option value="Bar">Bar — cocktails and small plates</option>
                <option value="Terrace">Terrace — weather permitting</option>
              </select>
            )}
          </Field>
        </div>
      ) : null}

      <Field
        label={kind === "careers" ? "Tell us about yourself" : "Anything else we should know?"}
        name="message"
        error={errors.message}
      >
        <textarea
          id="message"
          name="message"
          className="az-textarea"
          placeholder={
            kind === "careers"
              ? "Your experience, availability, and a link to your CV."
              : "Access requirements, dietaries, celebrations — anything that helps."
          }
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
      </Field>

      {state.status === "error" && state.message ? (
        <p className="az-error" role="alert">
          {state.message}
        </p>
      ) : null}

      <SubmitButton label={submitLabel} />

      <p className="text-xs text-[var(--az-mute)]">
        We&apos;ll only use these details to answer your enquiry.
        {kind === "table" ? " Terrace tables are subject to weather." : ""}
        {kind === "group" ? " Groups over eight require a deposit and a minimum spend." : ""}
      </p>
    </form>
  );
}
