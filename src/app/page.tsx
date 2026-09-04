import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { ProgrammeCard } from "@/components/programme-card";
import { SectionHeading } from "@/components/section-heading";
import { programmes, school, schedule } from "@/lib/content";
import { getUpcomingEvents } from "@/lib/events";

const stats = [
  { value: "1–12", label: "years old, one school journey" },
  { value: "4", label: "Montessori-trained classroom communities" },
  { value: "Mon–Fri", label: `${schedule.hours}` },
  { value: "East La", label: "Accra, Ghana" },
];

export default async function Home() {
  const { events } = await getUpcomingEvents();
  const nextEvents = events.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-cream to-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
              {school.heroKicker}
            </span>
            <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-brand-950 sm:text-5xl lg:text-[3.25rem]">
              {school.heroHeadline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
              {school.heroSubhead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/admissions"
                className="rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition hover:bg-brand-700"
              >
                Book a Visit
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-brand-200 bg-white px-7 py-3.5 text-sm font-semibold text-brand-800 transition hover:border-brand-300 hover:bg-brand-50"
              >
                Our Approach
              </Link>
            </div>
            <p className="mt-4 text-sm italic text-brand-700/70">
              &ldquo;{school.tagline}&rdquo;
            </p>
          </div>

          <div className="relative">
            <PhotoPlaceholder
              label="Hero photo — children at work in a Graceland classroom"
              aspect="aspect-[4/5] sm:aspect-[5/4]"
              className="shadow-xl shadow-brand-900/10"
            />
            <div className="absolute -bottom-6 -left-6 hidden w-52 rounded-2xl bg-white p-4 shadow-lg shadow-brand-900/10 ring-1 ring-brand-100 sm:block">
              <p className="font-heading text-2xl font-bold text-brand-700">1–12</p>
              <p className="text-xs text-ink/60">years old, one connected school journey</p>
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="border-t border-brand-100 bg-white/70">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-8 sm:px-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-xl font-bold text-brand-800 sm:text-2xl">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-ink/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-3xl bg-brand-600 p-8 text-white sm:p-10">
            <span className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-100">
              Our Mission
            </span>
            <p className="mt-4 font-heading text-2xl font-semibold leading-snug sm:text-[1.75rem]">
              {school.mission}
            </p>
          </div>
          <div className="rounded-3xl bg-sun-50 p-8 ring-1 ring-sun-100 sm:p-10">
            <span className="font-heading text-sm font-semibold uppercase tracking-wide text-sun-600">
              Our Vision
            </span>
            <p className="mt-4 font-heading text-2xl font-semibold leading-snug text-brand-950 sm:text-[1.75rem]">
              {school.vision}
            </p>
          </div>
        </div>
      </section>

      {/* Why Graceland / values */}
      <section className="bg-brand-950 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            tone="dark"
            kicker="Why families choose us"
            title="An education built around your child"
            description="Every part of a Graceland classroom — the materials, the pace, the relationships — is designed around how children actually learn."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {school.values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
              >
                <h3 className="font-heading text-base font-bold text-white">{v.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-brand-100/75">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes preview */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            kicker="Programmes"
            title="One school, every age from toddler to Upper Primary"
            description="Children move through one connected journey — Montessori foundations in the early years, growing into a full grade school experience by Upper Primary."
          />
          <Link
            href="/programmes"
            className="whitespace-nowrap text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            View all programmes →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programmes.map((p) => (
            <ProgrammeCard key={p.slug} programme={p} />
          ))}
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="bg-brand-50/60 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            kicker="Life at Graceland"
            title="A glimpse inside our classrooms"
            description="From practical-life work to Sports Day, a look at everyday moments across the school."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {["Practical life", "Outdoor play", "Reading corner", "Sports Day"].map((label) => (
              <PhotoPlaceholder key={label} label={label} aspect="aspect-square" />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-brand-800 transition hover:border-brand-300 hover:bg-brand-50"
            >
              View the full gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Events strip — only shown once there's something real to show */}
      {nextEvents.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading kicker="What's coming up" title="Upcoming school events" />
            <Link
              href="/events"
              className="whitespace-nowrap text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              View all events →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {nextEvents.map((e) => (
              <div
                key={e.id}
                className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-5"
              >
                <div className="flex h-14 w-14 flex-none flex-col items-center justify-center rounded-xl bg-brand-600 text-white">
                  <span className="text-[10px] font-semibold uppercase tracking-wide">
                    {new Date(e.date).toLocaleDateString("en-GB", { month: "short" })}
                  </span>
                  <span className="font-heading text-lg font-bold leading-none">
                    {new Date(e.date).getDate()}
                  </span>
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-brand-950">{e.title}</p>
                  <p className="text-xs text-ink/60">
                    {new Date(e.date).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 px-6 py-14 text-center text-white sm:px-16">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Come see Graceland for yourself
          </h2>
          <p className="max-w-xl text-brand-100/85">
            The best way to understand our approach is to meet us in person. Book a visit and
            we&apos;ll show you around, introduce you to our teachers, and answer every question.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/admissions"
              className="rounded-full bg-sun-500 px-7 py-3.5 text-sm font-semibold text-brand-950 shadow-md transition hover:bg-sun-300"
            >
              Book a Visit
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
