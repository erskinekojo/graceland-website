import { AdmissionForm } from "@/components/admission-form";
import { SectionHeading } from "@/components/section-heading";
import { admissionsFaqs, admissionsSteps, contact, school } from "@/lib/content";

export const metadata = {
  title: `Admissions — ${school.name}`,
  description: "Start your child's Montessori and grade school journey at Graceland — book a visit or send an inquiry.",
  openGraph: {
    title: `Admissions — ${school.name}`,
    description: "Start your child's Montessori and grade school journey at Graceland — book a visit or send an inquiry.",
    url: "/admissions",
  },
};

export default function AdmissionsPage() {
  return (
    <>
      <section className="bg-brand-50/70 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-600">
            Admissions
          </span>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-brand-950 sm:text-5xl">
            Begin your child&apos;s journey at Graceland
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            We admit children from 1 to 12 years old, with places opening throughout the year.
            The best next step is a visit — send us an inquiry and we&apos;ll take it from there.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <SectionHeading kicker="How it works" title="Four simple steps" align="center" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {admissionsSteps.map((s) => (
            <div key={s.step} className="rounded-2xl border border-brand-100 bg-white p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 font-heading text-sm font-bold text-white">
                {s.step}
              </span>
              <h3 className="mt-4 font-heading text-base font-bold text-brand-950">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form + contact rail */}
      <section className="bg-brand-950 py-16 text-white sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              tone="dark"
              kicker="Get started"
              title="Send us an inquiry"
              description="Tell us a little about your child and how to reach you. We typically reply within 1–2 working days."
            />
            <div className="mt-8 space-y-4 text-sm text-brand-100/85">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/10">
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M3 6l7 5 7-5M3 6v8a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H4a1 1 0 00-1 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <a href={`mailto:${contact.email}`} className="hover:text-white">{contact.email}</a>
              </div>
              {contact.phones.map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/10">
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <path d="M4 3h3l2 5-2 1a11 11 0 005 5l1-2 5 2v3a2 2 0 01-2 2A15 15 0 014 5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <a href={`tel:${p.replace(/\s+/g, "")}`} className="hover:text-white">{p}</a>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/10">
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M10 18s6-5.5 6-10a6 6 0 10-12 0c0 4.5 6 10 6 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
                {contact.address}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 sm:p-8">
            <AdmissionForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading align="center" kicker="Questions" title="Admissions FAQ" />
        <div className="mt-10 divide-y divide-brand-100 rounded-2xl border border-brand-100">
          {admissionsFaqs.map((f) => (
            <details key={f.question} className="group p-5 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-sm font-bold text-brand-950 sm:text-base">
                {f.question}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="flex-none text-brand-600 transition group-open:rotate-45"
                  aria-hidden
                >
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
