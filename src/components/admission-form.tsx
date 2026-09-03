"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryState } from "@/app/admissions/actions";
import { programmes } from "@/lib/content";

const initialState: InquiryState = { status: "idle" };

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs font-medium text-rose-600">{message}</p>;
}

export function AdmissionForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white">
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-4 font-heading text-lg font-bold text-brand-950">
          Inquiry received
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real visitors, catches simple bots */}
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="parentName" className="text-sm font-medium text-brand-950">
            Your name
          </label>
          <input
            id="parentName"
            name="parentName"
            type="text"
            required
            className="mt-1.5 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            placeholder="e.g. Ama Mensah"
          />
          <FieldError message={state.fieldErrors?.parentName} />
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-medium text-brand-950">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1.5 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            placeholder="e.g. 024 XXX XXXX"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-brand-950">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="mt-1.5 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          placeholder="you@example.com"
        />
        <FieldError message={state.fieldErrors?.email} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="childName" className="text-sm font-medium text-brand-950">
            Child&apos;s name (optional)
          </label>
          <input
            id="childName"
            name="childName"
            type="text"
            className="mt-1.5 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
        <div>
          <label htmlFor="childAge" className="text-sm font-medium text-brand-950">
            Child&apos;s age
          </label>
          <input
            id="childAge"
            name="childAge"
            type="text"
            required
            className="mt-1.5 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            placeholder="e.g. 3 years"
          />
          <FieldError message={state.fieldErrors?.childAge} />
        </div>
      </div>

      <div>
        <label htmlFor="programmeInterest" className="text-sm font-medium text-brand-950">
          Programme of interest
        </label>
        <select
          id="programmeInterest"
          name="programmeInterest"
          defaultValue=""
          className="mt-1.5 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        >
          <option value="">Not sure yet</option>
          {programmes.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name} ({p.ageRange})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-brand-950">
          Anything else you&apos;d like us to know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1.5 w-full resize-none rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          placeholder="Questions, preferred visit dates, anything at all"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}
