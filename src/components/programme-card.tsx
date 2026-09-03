import Link from "next/link";
import type { Programme } from "@/lib/content";
import { PhotoPlaceholder } from "./photo-placeholder";

export function ProgrammeCard({ programme }: { programme: Programme }) {
  return (
    <Link
      href={`/programmes#${programme.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/10"
    >
      <PhotoPlaceholder label={`${programme.name} photo`} aspect="aspect-[5/3]" className="rounded-none rounded-t-2xl border-0" />
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-sun-600">
          {programme.ageRange}
        </span>
        <h3 className="mt-1.5 font-heading text-lg font-bold text-brand-950">
          {programme.name}
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink/65">
          {programme.tagline}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:gap-2.5 transition-all">
          Learn more
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
