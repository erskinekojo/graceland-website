/**
 * Marks a spot where a real photo should go before launch.
 * Renders a soft brand-toned pattern with a visible label — never mistaken
 * for a finished image — so these are easy to find and swap later.
 */
export function PhotoPlaceholder({
  label,
  className = "",
  aspect = "aspect-[4/3]",
}: {
  label: string;
  className?: string;
  aspect?: string;
}) {
  const patternId = `p-${label.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-brand-200/70 bg-gradient-to-br from-brand-100 via-brand-50 to-sun-50 ${aspect} ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full text-brand-300/40"
        aria-hidden
      >
        <pattern
          id={patternId}
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.6" fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-brand-500/70" aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="8.5" cy="10" r="1.7" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 16l5-4 4 3 3-2.5L21 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-xs font-medium text-brand-700/80">{label}</span>
      </div>
    </div>
  );
}
