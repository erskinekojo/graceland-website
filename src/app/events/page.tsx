import { school, portalEventsApiUrl, portalEventsIcsUrl } from "@/lib/content";

export const metadata = {
  title: `Events — ${school.name}`,
  description: "Upcoming events at Graceland Montessori — open days, celebrations, and school-wide activities.",
  openGraph: {
    title: `Events — ${school.name}`,
    description: "Upcoming events at Graceland Montessori — open days, celebrations, and school-wide activities.",
    url: "/events",
  },
};

type PortalEvent = {
  id: number;
  title: string;
  date: string;
  time: string | null;
  description: string | null;
  disclaimer: string | null;
};

async function getUpcomingEvents(): Promise<{ events: PortalEvent[]; error: boolean }> {
  try {
    const res = await fetch(portalEventsApiUrl, {
      // Revalidate hourly — this is a low-traffic feed staff update occasionally,
      // not something that needs to be instant on the marketing site.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { events: [], error: true };
    const events = (await res.json()) as PortalEvent[];
    return { events, error: false };
  } catch {
    // The portal is a separate deployment — don't let it being unreachable
    // break the marketing site's build or this page.
    return { events: [], error: true };
  }
}

function formatEventDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatEventTime(timeStr: string) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  return date.toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit" });
}

export default async function EventsPage() {
  const { events, error } = await getUpcomingEvents();

  return (
    <>
      <section className="bg-brand-50/70 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-600">
            Events
          </span>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-brand-950 sm:text-5xl">
            What&apos;s coming up at Graceland
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            Open days, celebrations, and school-wide activities — all in one place. Subscribe to
            keep them on your own calendar.
          </p>
          <div className="mt-7">
            <a
              href={portalEventsIcsUrl}
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-brand-800 shadow-sm transition hover:border-brand-300 hover:bg-brand-50"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M1.5 6h13M4.5 1.5v2M11.5 1.5v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Subscribe to our calendar
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
        {error ? (
          <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-8 text-center">
            <p className="font-heading text-base font-bold text-brand-950">
              We couldn&apos;t load upcoming events right now
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Please check back shortly, or get in touch if you&apos;re looking for details on a
              specific date.
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-8 text-center">
            <p className="font-heading text-base font-bold text-brand-950">
              No upcoming events just yet
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Check back soon, or subscribe to our calendar above so new events land straight in
              your own.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex flex-col gap-4 rounded-2xl border border-brand-100 bg-white p-6 sm:flex-row sm:gap-6"
              >
                <div className="flex h-16 w-16 flex-none flex-col items-center justify-center rounded-xl bg-brand-600 text-white">
                  <span className="text-[10px] font-semibold uppercase tracking-wide">
                    {new Date(event.date).toLocaleDateString("en-GB", { month: "short" })}
                  </span>
                  <span className="font-heading text-xl font-bold leading-none">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="font-heading text-lg font-bold text-brand-950">{event.title}</h2>
                  <p className="mt-1 text-sm font-medium text-brand-700">
                    {formatEventDate(event.date)}
                    {event.time && <> · {formatEventTime(event.time)}</>}
                  </p>
                  {event.description && (
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">{event.description}</p>
                  )}
                  {event.disclaimer && (
                    <p className="mt-3 text-xs leading-relaxed text-ink/50">{event.disclaimer}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
