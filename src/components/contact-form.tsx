"use client";

import { useActionState } from "react";
import { submitContactMessage, type ContactState } from "@/app/contact/actions";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactMessage, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
        <h3 className="font-heading text-lg font-bold text-brand-950">Message sent</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
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
