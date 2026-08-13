"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitQuote } from "@/app/actions/quote";
import { emptyQuoteState } from "@/lib/lts/quote";
import { contact } from "@/lib/lts/content";

function Field({
  name,
  label,
  hint,
  type = "text",
  required = false,
  rows,
  error,
  defaultValue,
  autoComplete,
}: {
  name: string;
  label: string;
  hint?: string;
  type?: string;
  required?: boolean;
  rows?: number;
  error?: string;
  defaultValue?: string;
  autoComplete?: string;
}) {
  const id = `quote-${name}`;
  const describedBy =
    [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const control =
    "mt-2 w-full rounded-sm border bg-white px-4 py-3 text-base text-graphite-900 placeholder:text-steel-500 focus:border-hivis";
  const borderTone = error ? "border-red-600" : "border-steel-300";

  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-medium text-graphite-900"
      >
        {label}
        {required ? (
          <span aria-hidden className="ml-1 text-hivis-strong">
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-graphite-600">
            optional
          </span>
        )}
      </label>

      {rows ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          defaultValue={defaultValue}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={`${control} ${borderTone}`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={`${control} ${borderTone}`}
        />
      )}

      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-graphite-600">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-sm bg-hivis px-8 py-4 text-sm font-semibold uppercase tracking-wider text-graphite-950 transition-colors hover:bg-hivis-strong disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
    >
      {pending ? "Sending…" : "Send quote request"}
    </button>
  );
}

export function QuoteForm() {
  const [state, formAction] = useActionState(submitQuote, emptyQuoteState);
  const v = state.values;

  if (state.status === "success") {
    return (
      <div className="border border-steel-200 bg-white p-8 sm:p-10">
        <div
          aria-hidden
          className="flex h-12 w-12 items-center justify-center bg-hivis"
        >
          <svg
            viewBox="0 0 16 16"
            className="h-6 w-6 text-graphite-950"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
          >
            <path d="M3 8.5 6.5 12 13 4.5" />
          </svg>
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-graphite-900">
          Request received
        </h3>
        <p className="mt-3 max-w-prose text-graphite-600">{state.message}</p>
        {state.reference ? (
          <p className="mt-6 border-l-4 border-hivis bg-hivis-soft px-4 py-3 text-sm text-graphite-900">
            Your reference: <strong className="font-mono">{state.reference}</strong>
          </p>
        ) : null}
        <p className="mt-6 text-sm text-graphite-600">
          Need it moving sooner? Call{" "}
          <a
            href={contact.phoneHref}
            className="font-semibold text-graphite-900 underline decoration-hivis decoration-2 underline-offset-4"
          >
            {contact.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      className="border border-steel-200 bg-white p-6 sm:p-9"
    >
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="mb-7 border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
        >
          {state.message}
        </p>
      ) : null}

      <fieldset className="space-y-5">
        <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-hivis-strong">
          Your details
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            name="name"
            label="Name"
            required
            autoComplete="name"
            error={state.errors.name}
            defaultValue={v.name}
          />
          <Field
            name="company"
            label="Company"
            autoComplete="organization"
            defaultValue={v.company}
          />
          <Field
            name="email"
            label="Email"
            type="email"
            required
            autoComplete="email"
            error={state.errors.email}
            defaultValue={v.email}
          />
          <Field
            name="phone"
            label="Phone"
            type="tel"
            required
            autoComplete="tel"
            error={state.errors.phone}
            defaultValue={v.phone}
          />
        </div>
      </fieldset>

      <fieldset className="mt-9 space-y-5">
        <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-hivis-strong">
          The load
        </legend>
        <Field
          name="loadDescription"
          label="What needs moving?"
          hint="Machine, structure, vessel, plant — a make and model helps."
          required
          rows={3}
          error={state.errors.loadDescription}
          defaultValue={v.loadDescription}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            name="dimensions"
            label="Dimensions (L × W × H)"
            hint="Metres, travelling dimensions if known."
            defaultValue={v.dimensions}
          />
          <Field
            name="weight"
            label="Weight"
            hint="Kilogrammes or tonnes."
            defaultValue={v.weight}
          />
        </div>
      </fieldset>

      <fieldset className="mt-9 space-y-5">
        <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-hivis-strong">
          The movement
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            name="collection"
            label="Collection from"
            hint="Town and postcode is enough to start."
            required
            error={state.errors.collection}
            defaultValue={v.collection}
          />
          <Field
            name="delivery"
            label="Delivery to"
            hint="Include the country for European moves."
            required
            error={state.errors.delivery}
            defaultValue={v.delivery}
          />
        </div>
        <Field
          name="timing"
          label="When does it need to move?"
          defaultValue={v.timing}
        />
        <Field
          name="notes"
          label="Anything else we should know"
          hint="Site access, lifting arrangements, restricted delivery windows."
          rows={4}
          defaultValue={v.notes}
        />
      </fieldset>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor="quote-website">Website</label>
        <input id="quote-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-9 flex flex-col gap-4 border-t border-steel-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-graphite-600">
          Fields marked <span className="text-hivis-strong">*</span> are
          required. We only use your details to answer this enquiry.
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}
