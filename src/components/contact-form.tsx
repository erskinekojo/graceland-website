"use client";

import { useState, type FormEvent } from "react";
import { sendToWeb3Forms } from "@/lib/web3forms";

type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, setState] = useState<ContactState>(initialState);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    // Honeypot field — real users never fill this in.
    const website = String(formData.get("website") || "").trim();

    const fieldErrors: Record<string, string> = {};
    if (!name) fieldErrors.name = "Please tell us your name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fieldErrors.email = "Please enter a valid email address.";
    }
    if (!message) fieldErrors.message = "Please add a short message.";

    if (Object.keys(fieldErrors).length > 0) {
      setState({ status: "error", message: "Please check the highlighted fields.", fieldErrors });
      return;
    }

    if (website) {
      // Honeypot tripped — silently pretend success, drop the submission.
      setState({ status: "success", message: "Thank you — we'll be in touch soon." });
      return;
    }

    setPending(true);
    try {
      await sendToWeb3Forms("New contact message", {
        Name: name,
        Email: email,
        Message: message,
        "Submitted at": new Date().toISOString(),
      });
      setState({ status: "success", message: "Thank you! We've received your message." });
    } catch (err) {
      console.error("Contact form delivery failed:", err);
      setState({
        status: "error",
        message: "Sorry — something went wrong. Please call or email us directly.",
      });
    } finally {
      setPending(false);
    }
  }

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
        <h3 className="font-heading text-lg font-bold text-brand-950">Message sent</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{state.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && state.message && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="name" className="text-sm font-medium text-brand-950">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1.5 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />
        {state.fieldErrors?.name && (
          <p className="mt-1.5 text-xs font-medium text-rose-600">{state.fieldErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-brand-950">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1.5 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />
        {state.fieldErrors?.email && (
          <p className="mt-1.5 text-xs font-medium text-rose-600">{state.fieldErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-brand-950">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1.5 w-full resize-none rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />
        {state.fieldErrors?.message && (
          <p className="mt-1.5 text-xs font-medium text-rose-600">{state.fieldErrors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
