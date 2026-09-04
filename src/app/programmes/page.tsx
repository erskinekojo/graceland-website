import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { SectionHeading } from "@/components/section-heading";
import { programmes, schedule, school } from "@/lib/content";

export const metadata = {
  title: `Programmes — ${school.name}`,
  description: "Montessori and grade school programmes for children 1–12 years at Graceland Montessori.",
  openGraph: {
    title: `Programmes — ${school.name}`,
    description: "Montessori and grade school programmes for children 1–12 years at Graceland Montessori.",
    url: "/programmes",
  },
};

export default function ProgrammesPage() {
  return (
    <>
      <section className="bg-brand-50/70 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-600">
            Programmes
          </span>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-brand-950 sm:text-5xl">
            One school, one journey, every age
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            Children move through four connected communities as they grow — Montessori
            foundations in the early years, growing into a full grade school journey by Upper
            Primary. All programmes run {schedule.days}, {schedule.hours}.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl divide-y divide-brand-100 px-5 sm:px-8">
        {programmes.map((programme, i) => (
          <section
            key={programme.slug}
            id={programme.slug}
            className="scroll-mt-24 grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 sm:py-20"
          >
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <PhotoPlaceholder
                label={`${programme.name} classroom photo`}
                aspect="aspect-[5/4]"
                className="shadow-lg shadow-brand-900/10"
              />
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <span className="inline-flex items-center gap-2 rounded-full bg-sun-100 px-3.5 py-1 text-xs font-semibold text-sun-600">
                {programme.ageRange}
              </span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-brand-950">
                {programme.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-brand-700">{programme.tagline}</p>
              <p className="mt-4 text-base leading-relaxed text-ink/70">
                {programme.description}
              </p>
              <ul className="mt-6 space-y-3">
                {programme.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-ink/75">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-100 text-brand-700">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
              <Link
                href="/admissions"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
              >
                Inquire about {programme.name}
              </Link>
            </div>
          </section>
        ))}
      </div>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24">
        <SectionHeading align="center" kicker="Ready to see it in person?" title="Book a visit to any classroom" />
        <div className="mt-8 flex justify-center">
          <Link
            href="/admissions"
            className="rounded-full bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition hover:bg-brand-700"
          >
            Book a Visit
          </Link>
        </div>
      </section>
    </>
  );
}
