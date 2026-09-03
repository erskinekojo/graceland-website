"use server";

import { sendToWeb3Forms } from "@/lib/web3forms";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

/**
 * General contact-form submissions. Same pattern as the admissions
 * inquiry action (see app/admissions/actions.ts): validates, emails via
 * Web3Forms if WEB3FORMS_ACCESS_KEY is configured, otherwise logs
 * server-side. Kept separate from admissions since a general "contact us"
 * message and a prospective-family inquiry are different things the
 * school will likely want routed differently once the internal system is
 * wired up.
 */
export async function submitContactMessage(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const website = String(formData.get("website") || "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Please tell us your name.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }
  if (!message) fieldErrors.message = "Please add a short message.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  if (website) {
    return { status: "success", message: "Thank you — we'll be in touch soon." };
  }

  const payload = {
    name,
    email,
    message,
    submittedAt: new Date().toISOString(),
    source: "public-website-contact-form",
  };

  if (process.env.WEB3FORMS_ACCESS_KEY) {
    try {
      await sendToWeb3Forms("New contact message", {
        Name: name,
        Email: email,
        Message: message,
        "Submitted at": payload.submittedAt,
      });
    } catch (err) {
      console.error("Contact form delivery failed:", err);
      return {
        status: "error",
        message: "Sorry — something went wrong. Please call or email us directly.",
      };
    }
  } else {
    console.log("New contact message (WEB3FORMS_ACCESS_KEY not set):", payload);
  }

  return { status: "success", message: "Thank you! We've received your message." };
}
