/**
 * Shared enquiry-form types and the initial form state.
 *
 * These live outside the `"use server"` action module on purpose: a server
 * module may only export async functions, so constants and types have to be
 * imported from somewhere else.
 */

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Record<string, string>;
};

export const initialEnquiryState: EnquiryState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

export const ENQUIRY_KINDS = ["table", "group", "careers", "general"] as const;

export type EnquiryKind = (typeof ENQUIRY_KINDS)[number];

export const ENQUIRY_SUBJECTS: Record<EnquiryKind, string> = {
  table: "Table booking request",
  group: "Group & events enquiry",
  careers: "Careers enquiry",
  general: "General enquiry",
};
