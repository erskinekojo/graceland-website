"use server";

import { programmes } from "@/lib/content";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

/**
 * Handles a submitted admissions inquiry.
 *
 * FUTURE INTEGRATION SEAM: this is the one place an admissions inquiry
 * passes through on its way out of the site. Today, with no backend wired
 * up, it validates the submission and — if ADMISSIONS_WEBHOOK_URL is set —
 * forwards it as JSON to that URL; otherwise it just logs server-side so
 * nothing is silently lost during development.
 *
 * When the school's internal management system is ready to receive these,
 * point ADMISSIONS_WEBHOOK_URL at its inquiries endpoint (or replace the
 * forwarding block below with a direct, authenticated call to that
 * system's API). No other file needs to change — every page that renders
 * the form calls this same action.
 */
export async function submitInquiry(
  _prevState: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const parentName = String(formData.get("parentName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const childName = String(formData.get("childName") || "").trim();
  const childAge = String(formData.get("childAge") || "").trim();
  const programmeInterest = String(formData.get("programmeInterest") || "").trim();
  const message = String(formData.get("message") || "").trim();
  // Honeypot field — real users never fill this in.
  const website = String(formData.get("website") || "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!parentName) fieldErrors.parentName = "Please tell us your name.";
  if (!email && !phone) {
    fieldErrors.email = "Please leave an email or phone number so we can reach you.";
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "That email address doesn't look right.";
  }
  if (!childAge) fieldErrors.childAge = "Please share your child's age.";
  if (
    programmeInterest &&
    !programmes.some((p) => p.slug === programmeInterest)
  ) {
    fieldErrors.programmeInterest = "Please choose a valid programme.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  if (website) {
    // Honeypot tripped — silently pretend success, drop the submission.
    return { status: "success", message: "Thank you — we'll be in touch soon." };
  }

  const inquiry = {
    parentName,
    email: email || null,
    phone: phone || null,
    childName: childName || null,
    childAge,
    programmeInterest: programmeInterest || null,
    message: message || null,
    submittedAt: new Date().toISOString(),
    source: "public-website",
  };

  const webhookUrl = process.env.ADMISSIONS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
      });
    } catch (err) {
      console.error("Admissions webhook forwarding failed:", err);
      return {
        status: "error",
        message:
          "Sorry — something went wrong sending your inquiry. Please call or email us directly.",
      };
    }
  } else {
    // No backend configured yet — log so the submission is at least
    // visible in server logs during development / before launch.
    console.log("New admissions inquiry (no webhook configured):", inquiry);
  }

  return {
    status: "success",
    message:
      "Thank you! We've received your inquiry and will be in touch within 1–2 working days.",
  };
}
