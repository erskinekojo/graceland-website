"use server";

import { programmes } from "@/lib/content";
import { sendToWeb3Forms } from "@/lib/web3forms";

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
 * up, it validates the submission and — if WEB3FORMS_ACCESS_KEY is set —
 * emails it to the school via Web3Forms (see src/lib/web3forms.ts);
 * otherwise it just logs server-side so nothing is silently lost during
 * development.
 *
 * When the school's internal management system is ready to receive these,
 * replace the sendToWeb3Forms call below with a direct, authenticated call
 * to that system's API. No other file needs to change — every page that
 * renders the form calls this same action.
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

  const programmeLabel =
    programmes.find((p) => p.slug === programmeInterest)?.name || programmeInterest || null;

  const inquiry = {
    parentName,
    email: email || null,
    phone: phone || null,
    childName: childName || null,
    childAge,
    programmeInterest: programmeLabel,
    message: message || null,
    submittedAt: new Date().toISOString(),
    source: "public-website",
  };

  if (process.env.WEB3FORMS_ACCESS_KEY) {
    try {
      await sendToWeb3Forms("New admissions inquiry", {
        "Parent name": parentName,
        Email: email || "(not provided)",
        Phone: phone || "(not provided)",
        "Child's name": childName || "(not provided)",
        "Child's age": childAge,
        "Programme interest": programmeLabel || "(not specified)",
        Message: message || "(none)",
        "Submitted at": inquiry.submittedAt,
      });
    } catch (err) {
      console.error("Admissions form delivery failed:", err);
      return {
        status: "error",
        message:
          "Sorry — something went wrong sending your inquiry. Please call or email us directly.",
      };
    }
  } else {
    // No delivery configured yet — log so the submission is at least
    // visible in server logs during development / before launch.
    console.log("New admissions inquiry (WEB3FORMS_ACCESS_KEY not set):", inquiry);
  }

  return {
    status: "success",
    message:
      "Thank you! We've received your inquiry and will be in touch within 1–2 working days.",
  };
}
