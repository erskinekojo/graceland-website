/**
 * Shared helper for fetching the portal's public events feed.
 *
 * Used by both the homepage's "Upcoming school events" strip and the full
 * /events page, so both stay in sync with a single source of truth instead
 * of one being hardcoded and drifting from the other.
 */

import { portalEventsApiUrl } from "@/lib/content";

export type PortalEvent = {
  id: number;
  title: string;
  date: string;
  time: string | null;
  description: string | null;
  disclaimer: string | null;
};

export async function getUpcomingEvents(): Promise<{ events: PortalEvent[]; error: boolean }> {
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
    // break the marketing site's build or any page that uses this.
    return { events: [], error: true };
  }
}

export function formatEventDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatEventTime(timeStr: string) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  return date.toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit" });
}
