/**
 * Shared types for the quote request form.
 *
 * These live outside app/actions/quote.ts on purpose: a "use server" module
 * may only export async functions, so a const exported from there does not
 * survive to the client.
 */

export type QuoteState = {
  status: "idle" | "success" | "error";
  message: string;
  reference?: string;
  errors: Record<string, string>;
  /** Echoed back so a rejected submission does not wipe the form. */
  values: Record<string, string>;
};

export const emptyQuoteState: QuoteState = {
  status: "idle",
  message: "",
  errors: {},
  values: {},
};
