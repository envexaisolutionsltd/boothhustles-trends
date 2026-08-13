"use server";

import { business } from "@/lib/azotea";
import {
  ENQUIRY_KINDS,
  ENQUIRY_SUBJECTS,
  type EnquiryKind,
  type EnquiryState,
} from "@/lib/enquiry";

/** Fields captured per enquiry type, beyond the shared name/email/phone/message. */
const EXTRA_FIELDS = [
  "date",
  "time",
  "guests",
  "occasion",
  "area",
  "role",
] as const;

function clean(value: FormDataEntryValue | null, max = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Handles every enquiry form on the site.
 *
 * Delivery: if RESEND_API_KEY (and optionally ENQUIRY_TO_EMAIL) is configured
 * the enquiry is emailed to the venue. Without that configuration the enquiry
 * is validated and logged server-side only — the response says so explicitly
 * rather than implying a message reached the team.
 */
export async function submitEnquiry(
  _prevState: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // Honeypot: silently accept and drop obvious bot submissions.
  if (clean(formData.get("company"))) {
    return { status: "success", message: "Thank you — your enquiry is on its way.", fieldErrors: {} };
  }

  const kindRaw = clean(formData.get("kind"), 40);
  const kind: EnquiryKind = (ENQUIRY_KINDS as readonly string[]).includes(kindRaw)
    ? (kindRaw as EnquiryKind)
    : "general";

  const name = clean(formData.get("name"), 120);
  const email = clean(formData.get("email"), 160);
  const phone = clean(formData.get("phone"), 40);
  const message = clean(formData.get("message"), 4000);

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) fieldErrors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Please enter a valid email address.";
  if (kind === "group" && !phone) {
    fieldErrors.phone = "A contact number helps us confirm group bookings quickly.";
  }
  if (kind === "general" && message.length < 5) {
    fieldErrors.message = "Please add a little detail so we can help.";
  }

  const guests = clean(formData.get("guests"), 10);
  if (kind === "group" && guests) {
    const n = Number(guests);
    if (!Number.isFinite(n) || n < 8) {
      fieldErrors.guests = "Group events are for parties of 8 or more.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  const extras = EXTRA_FIELDS.map((field) => [field, clean(formData.get(field), 200)] as const)
    .filter(([, value]) => value !== "");

  const lines = [
    `Type: ${ENQUIRY_SUBJECTS[kind]}`,
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "",
    ...extras.map(([field, value]) => `${field[0].toUpperCase()}${field.slice(1)}: ${value}`),
    message ? `\nMessage:\n${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const to =
    process.env.ENQUIRY_TO_EMAIL ??
    (kind === "group" ? business.groupsEmail : business.email);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  if (!apiKey || !from) {
    // No mail transport wired up in this environment.
    console.info(`[azotea] enquiry received (not delivered — mail not configured)\n${lines}`);
    return {
      status: "success",
      message:
        `Thanks ${name.split(" ")[0]} — your enquiry has been recorded. Email delivery isn't ` +
        `configured on this deployment yet, so for anything urgent please call ${business.phone} ` +
        `or email ${to}.`,
      fieldErrors: {},
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `${ENQUIRY_SUBJECTS[kind]} — ${name}`,
        text: lines,
      }),
    });

    if (!response.ok) {
      throw new Error(`Mail provider responded ${response.status}`);
    }
  } catch (error) {
    console.error("[azotea] enquiry delivery failed", error);
    return {
      status: "error",
      message: `Sorry — we couldn't send that just now. Please call ${business.phone} or email ${to}.`,
      fieldErrors: {},
    };
  }

  return {
    status: "success",
    message: `Thanks ${name.split(" ")[0]} — your enquiry is with the team. We'll be in touch shortly.`,
    fieldErrors: {},
  };
}
