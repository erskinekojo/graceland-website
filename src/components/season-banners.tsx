import Link from "next/link";
import { SeasonIcon } from "@/components/season-icons";
import { SEASONS } from "@/lib/seasons";

/**
 * One slim greeting strip per season. All are rendered on the server and hidden
 * by default; the CSS in layout.tsx (BANNER_CSS) shows only the one matching
 * html[data-theme]. Doing it in CSS (rather than choosing in React) means the
 * right banner is in place at first paint, so the page never jumps.
 */
export function SeasonBanners() {
  return (
    <>
      {SEASONS.map((s) => (
        <div key={s.id} className={`season-banner sb-${s.id}`}>
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2 text-center text-xs font-medium sm:px-8 sm:text-sm">
            <SeasonIcon id={s.id} size={18} stage={3} className="season-banner-icon flex-none" />
            <span>{s.banner.text}</span>
            {s.banner.link && (
              <Link
                href={s.banner.link.href}
                className="underline decoration-white/60 underline-offset-2 hover:decoration-white"
              >
                {s.banner.link.label}
              </Link>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
