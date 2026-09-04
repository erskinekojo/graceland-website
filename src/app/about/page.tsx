import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { SectionHeading } from "@/components/section-heading";
import { approachPillars, school, staff } from "@/lib/content";

export const metadata = {
  title: `About Us — ${school.name}`,
  description: school.mission,
  openGraph: {
    title: `About Us — ${school.name}`,
    description: school.mission,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-50/70 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-600">
            About Graceland
          </span>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-brand-950 sm:text-5xl">
            Montessori roots, a grade school journey
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            {school.heroSubhead}
          </p>
        </div>
      </section>

      {/* Mission & Vision recap */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-600">
              Our Mission
            </h2>
            <p className="mt-3 font-heading text-2xl font-semibold leading-snug text-brand-950">
              {school.mission}
            </p>
          </div>
          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-sun-600">
              Our Vision
            </h2>
            <p className="mt-3 font-heading text-2xl font-semibold leading-snug text-brand-950">
              {school.vision}
            </p>
          </div>
        </div>
      </section>

      {/* Montessori approach */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                kicker="The Montessori Approach"
                title="Why we teach the way we do"
                description="Dr. Maria Montessori's method is over a century old, and still ahead of its time: it treats children as capable, curious people, and builds an environment where that capability can grow."
              />
              <ul className="mt-8 space-y-6">
                {approachPillars.map((pillar) => (
                  <li key={pillar.title} className="flex gap-4">
                    <span className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-100 text-brand-700">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-bold text-brand-950">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink/65">
                        {pillar.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <PhotoPlaceholder
              label="Children working with Montessori materials"
              aspect="aspect-[4/5]"
              className="shadow-lg shadow-brand-900/10"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-950 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading tone="dark" kicker="What we hold to" title="Our values in the classroom" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {school.values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-heading text-base font-bold text-white">{v.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-brand-100/75">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading
          kicker="Meet the team"
          title="Teachers who know your child by name"
          description="A small, experienced team leading every classroom at Graceland."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {staff.map((member) => (
            <div key={member.name} className="rounded-2xl border border-brand-100 bg-white p-5">
              <PhotoPlaceholder label={`${member.name} photo`} aspect="aspect-square" className="rounded-xl" />
              <h3 className="mt-4 font-heading text-base font-bold text-brand-950">
                {member.name}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                {member.role}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-brand-600 px-6 py-14 text-center text-white sm:px-16">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            See our programmes for every age
          </h2>
          <p className="max-w-xl text-brand-100/90">
            From Toddler Community to Upper Primary, one connected journey — Montessori roots
            growing into a full grade school experience.
          </p>
          <Link
            href="/programmes"
            className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-800 shadow-md transition hover:bg-brand-50"
          >
            View Programmes
          </Link>
        </div>
      </section>
    </>
  );
}
