"use server";

import { contact } from "@/lib/lts/content";
import { emptyQuoteState, type QuoteState } from "@/lib/lts/quote";

const FIELDS = [
  "name",
  "company",
  "email",
  "phone",
  "loadDescription",
  "dimensions",
  "weight",
  "collection",
  "delivery",
  "timing",
  "notes",
] as const;

const REQUIRED: Record<string, string> = {
  name: "Please tell us your name.",
  email: "We need an email address to send the quote to.",
  phone: "A phone number lets us clarify the load quickly.",
  loadDescription: "Tell us what needs moving.",
  collection: "Where is the load being collected from?",
  delivery: "Where is the load going?",
};

function clean(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim().slice(0, 2000) : "";
}

/** Deliberately permissive — enough to catch typos, not to police addresses. */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function reference(): string {
  const now = new Date();
  const stamp = [
    now.getFullYear().toString().slice(2),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LTS-${stamp}-${suffix}`;
}

/**
 * Handle a quote request.
 *
 * Delivery is environment-driven so the form works on day one and gets better
 * once credentials are added:
 *   RESEND_API_KEY + QUOTE_NOTIFY_EMAIL → emailed to the office.
 *   Neither set                          → logged server-side for collection.
 */
export async function submitQuote(
  _prevState: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  // Honeypot: a real person never fills a hidden field.
  if (clean(formData.get("website"))) {
    return { ...emptyQuoteState, status: "success", message: "Thank you." };
  }

  const values: Record<string, string> = {};
  for (const field of FIELDS) values[field] = clean(formData.get(field));

  const errors: Record<string, string> = {};
  for (const [field, message] of Object.entries(REQUIRED)) {
    if (!values[field]) errors[field] = message;
  }
  if (values.email && !looksLikeEmail(values.email)) {
    errors.email = "That email address doesn't look right.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields and send again.",
      errors,
      values,
    };
  }

  const ref = reference();
  const summary = [
    `Quote request ${ref}`,
    "",
    `Name:        ${values.name}`,
    `Company:     ${values.company || "—"}`,
    `Email:       ${values.email}`,
    `Phone:       ${values.phone}`,
    "",
    `Load:        ${values.loadDescription}`,
    `Dimensions:  ${values.dimensions || "—"}`,
    `Weight:      ${values.weight || "—"}`,
    `Collection:  ${values.collection}`,
    `Delivery:    ${values.delivery}`,
    `Timing:      ${values.timing || "—"}`,
    "",
    `Notes:       ${values.notes || "—"}`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const notify = process.env.QUOTE_NOTIFY_EMAIL ?? contact.primaryEmail;
  const from = process.env.QUOTE_FROM_EMAIL ?? "website@lewistransport.co.uk";

  if (apiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [notify],
          reply_to: values.email,
          subject: `Quote request ${ref} — ${values.loadDescription.slice(0, 60)}`,
          text: summary,
        }),
      });

      if (!response.ok) {
        console.error(
          `[quote] delivery failed (${response.status})\n${summary}`,
        );
        return {
          status: "error",
          message: `We couldn't send that automatically. Please call us on ${contact.phone} and we'll take the details over the phone.`,
          errors: {},
          values,
        };
      }
    } catch (error) {
      console.error(`[quote] delivery threw\n${summary}`, error);
      return {
        status: "error",
        message: `We couldn't send that automatically. Please call us on ${contact.phone} and we'll take the details over the phone.`,
        errors: {},
        values,
      };
    }
  } else {
    // No mail provider configured yet — keep the enquiry in the server log
    // rather than dropping it silently.
    console.info(`[quote] no RESEND_API_KEY set; logging enquiry\n${summary}`);
  }

  return {
    status: "success",
    message:
      "Thank you — your request is with our traffic office. We'll come back to you with a route assessment and price.",
    reference: ref,
    errors: {},
    values: {},
  };
}
