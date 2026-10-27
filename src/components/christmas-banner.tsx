import Link from "next/link";

/**
 * Festive greeting strip shown only while the Christmas theme is active
 * (visibility is controlled in globals.css via html[data-theme="christmas"]).
 * In that theme the "sun" colour tokens are festive red, so bg-sun-600 is red
 * here; the banner is hidden in every other theme.
 */
export function ChristmasBanner() {
  return (
    <div className="christmas-only bg-sun-600 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2 text-center text-xs font-medium sm:px-8 sm:text-sm">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="flex-none"
        >
          <path d="m12 2.500 2.900 5.900 6.500.9-4.700 4.600 1.100 6.500L12 17.300l-5.800 3.100 1.100-6.500L2.600 9.300l6.500-.9L12 2.500Z" />
        </svg>
        <span>Merry Christmas from all of us at Graceland Montessori.</span>
        <Link
          href="/blog/carols-day-celebration"
          className="underline decoration-white/60 underline-offset-2 hover:decoration-white"
        >
          Relive Carols Day
        </Link>
      </div>
    </div>
  );
}
