import Link from "next/link";

/**
 * Slim awareness strip shown only while the Pink October theme is active
 * (visibility is controlled in globals.css via html[data-theme="pink-october"]).
 * Links to our own community screening post rather than making health claims.
 */
export function PinkOctoberBanner() {
  return (
    <div className="pink-october-only bg-brand-600 text-white">
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
          <path d="M12 3c-2.500 0-4.200 1.700-4.200 3.800 0 3.200 4.200 5.500 4.200 5.500s4.200-2.300 4.200-5.500C16.200 4.700 14.500 3 12 3Z" />
          <path d="M12 12.300 7.500 21M12 12.300 16.500 21" />
        </svg>
        <span>October is Breast Cancer Awareness Month — early detection saves lives.</span>
        <Link
          href="/blog/breast-cancer-awareness-screening"
          className="underline decoration-white/60 underline-offset-2 hover:decoration-white"
        >
          See our community screening
        </Link>
      </div>
    </div>
  );
}
