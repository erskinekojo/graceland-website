import { ContactForm } from "@/components/contact-form";
import { contact, schedule, school } from "@/lib/content";

export const metadata = {
  title: `Contact — ${school.name}`,
  description: "Get in touch with Graceland Montessori.",
  openGraph: {
    title: `Contact — ${school.name}`,
    description: "Get in touch with Graceland Montessori.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="text-center">
        <span className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-600">
          Contact
        </span>
        <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-brand-950 sm:text-5xl">
          We&apos;d love to hear from you
        </h1>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-brand-100 bg-white p-6">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-brand-600">
                Address
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{contact.address}</p>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-white p-6">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-brand-600">
                Phone
              </h3>
              {contact.phones.map((p) => (
                <p key={p} className="mt-2 text-sm text-ink/75">
                  <a href={`tel:${p.replace(/\s+/g, "")}`} className="hover:text-brand-700">
                    {p}
                  </a>
                </p>
              ))}
            </div>
            <div className="rounded-2xl border border-brand-100 bg-white p-6">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-brand-600">
                Email
              </h3>
              <p className="mt-2 text-sm text-ink/75">
                <a href={`mailto:${contact.email}`} className="hover:text-brand-700">
                  {contact.email}
                </a>
              </p>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-white p-6">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-brand-600">
                Office hours
              </h3>
              <p className="mt-2 text-sm text-ink/75">{contact.officeHours}</p>
              <p className="mt-1 text-xs text-ink/50">
                School hours: {schedule.days}, {schedule.hours}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-brand-100">
            <iframe
              title="Graceland Montessori location"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&z=15&output=embed`}
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-brand-100 bg-white p-6 sm:p-8">
          <h2 className="font-heading text-xl font-bold text-brand-950">Send a message</h2>
          <p className="mt-1.5 text-sm text-ink/60">
            For admissions inquiries, please use our{" "}
            <a href="/admissions" className="font-medium text-brand-700 hover:underline">
              Admissions page
            </a>{" "}
            instead — this form is for general questions.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
