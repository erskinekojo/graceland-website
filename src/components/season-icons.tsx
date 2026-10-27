import type { SeasonId } from "@/lib/seasons";

/**
 * Small icons for each season, used on the banners and as the floating toy's
 * face. Drawn in currentColor so the active theme tints them. No client code
 * here, so server-rendered banners can use it too.
 */

type IconProps = {
  id: SeasonId;
  size?: number;
  /** Seedling growth stage 0-4 (farmers-day only). */
  stage?: number;
  /** Let the ribbon draw itself on first paint (pink-october only). */
  draw?: boolean;
  className?: string;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function RibbonGlyph({ size = 24, draw }: { size?: number; draw?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" {...stroke} strokeWidth={3} aria-hidden className={draw ? "icon-draw" : undefined}>
      <path pathLength={1} d="M16 3.5c-3.6 0-6 2.5-6 5.6 0 4.6 6 8 6 8s6-3.4 6-8c0-3.1-2.4-5.6-6-5.6Z" />
      <path pathLength={1} d="M16 17.1 9.5 28.5M16 17.1 22.5 28.5" />
    </svg>
  );
}

/** The Christmas toy's face: a little snow globe (not used on the banner). */
export function SnowGlobeArt({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 64 72" width={size} height={(size * 72) / 64} aria-hidden>
      <defs>
        <clipPath id="snow-globe-glass">
          <circle cx="32" cy="30" r="25" />
        </clipPath>
      </defs>
      <path d="M14 58h36l3 11H11l3-11Z" fill="#b91c1c" />
      <rect x="12" y="55" width="40" height="6" rx="3" fill="#fcd34d" />
      <circle cx="32" cy="30" r="26" fill="#e0f2fe" fillOpacity=".6" stroke="#7dd3fc" strokeWidth="2" />
      <g clipPath="url(#snow-globe-glass)">
        <ellipse cx="32" cy="53" rx="28" ry="13" fill="#fff" />
        <rect x="30" y="41" width="4" height="7" fill="#7c4a1e" />
        <path d="M32 13 22 27h20L32 13Z" fill="#15803d" />
        <path d="M32 19 20 35h24L32 19Z" fill="#16a34a" />
        <path d="M32 26 18 43h28L32 26Z" fill="#15803d" />
        <circle cx="32" cy="12" r="2.2" fill="#fcd34d" />
        <circle cx="19" cy="20" r="1.3" fill="#fff" />
        <circle cx="45" cy="24" r="1.3" fill="#fff" />
        <circle cx="14" cy="33" r="1.1" fill="#fff" />
        <circle cx="50" cy="36" r="1.1" fill="#fff" />
        <circle cx="26" cy="9" r="1" fill="#fff" />
      </g>
      <path d="M15 24a18 18 0 0 1 11-12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".85" />
    </svg>
  );
}

function Sprout({ size, stage }: { size: number; stage: number }) {
  const s = Math.max(0, Math.min(4, stage));
  const top = 26 - s * 4.5;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <ellipse cx="16" cy="27.5" rx="11" ry="3" fill="#92400e" />
      {s === 0 && <circle cx="16" cy="25" r="2" fill="#78350f" />}
      {s > 0 && <path d={`M16 26V${top}`} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" />}
      {Array.from({ length: Math.min(s, 4) }, (_, k) => {
        const y = 24 - k * 4.2;
        const left = k % 2 === 0;
        return (
          <ellipse
            key={k}
            cx={left ? 11.5 : 20.5}
            cy={y}
            rx="4.4"
            ry="2"
            fill="currentColor"
            transform={`rotate(${left ? -28 : 28} ${left ? 11.5 : 20.5} ${y})`}
          />
        );
      })}
      {s === 4 && <ellipse cx="16" cy="6.5" rx="3" ry="4.6" fill="#f59e0b" />}
    </svg>
  );
}

export function SeasonIcon({ id, size = 20, stage = 0, draw, className }: IconProps) {
  const wrap = (children: React.ReactNode, viewBox = "0 0 24 24", extra: Record<string, unknown> = {}) => (
    <svg width={size} height={size} viewBox={viewBox} aria-hidden className={className} {...extra}>
      {children}
    </svg>
  );

  switch (id) {
    case "pink-october":
      return <RibbonGlyph size={size} draw={draw} />;

    case "christmas":
      return wrap(<path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9L12 2.5Z" {...stroke} />);

    case "ghana-month":
      return wrap(<path d="M12 2.5l2.9 6.2 6.8.8-5 4.7 1.3 6.7L12 17.4 6 20.9l1.3-6.7-5-4.7 6.8-.8L12 2.5Z" fill="currentColor" />);

    case "ramadan":
    case "eid":
    case "eid-al-adha":
      // A lantern (fanous)
      return wrap(
        <g {...stroke} strokeWidth={1.6}>
          <path d="M12 1.8v2.4" />
          <path d="M8.5 7 12 4l3.5 3z" fill="currentColor" />
          <path d="M8 7h8v1.4c1.4 2.2 1.4 6.4 0 8.6H8c-1.4-2.200-1.4-6.4 0-8.6V7Z" />
          <path d="M12 8.4v8.6M9.6 9c-.9 2.2-.9 5.600 0 7.800M14.4 9c.9 2.200.9 5.600 0 7.800" strokeWidth={1.2} />
          <path d="M8.500 17h7l-.8 2.400H9.300L8.500 17Z" fill="currentColor" />
          <path d="M12 19.400V22" />
        </g>
      );

    case "easter":
      return wrap(
        <>
          <path d="M12 2.5c-3.5 0-6.5 5.500-6.500 10a6.500 6.500 0 0 0 13 0c0-4.500-3-10-6.500-10Z" fill="currentColor" />
          <path d="M5.900 13.200l2.100-1.500 2.100 1.500 2-1.500 2.100 1.500 2.100-1.500 1.800 1.300" fill="none" stroke="#fff" strokeOpacity=".9" strokeWidth="1.700" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="17" r="1.200" fill="#fff" fillOpacity=".9" />
        </>
      );

    case "new-year":
      return wrap(
        <g {...stroke} strokeWidth={1.8}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.600 5.600l2.800 2.800M15.600 15.600l2.800 2.800M18.400 5.600l-2.800 2.800M8.400 15.600l-2.800 2.800" />
          <circle cx="12" cy="12" r="1.300" fill="currentColor" />
        </g>
      );

    case "month-of-love":
      return wrap(<path d="M12 21s-7.500-4.600-9.500-9.200C1.100 8.600 3 5.500 6.100 5.500c1.900 0 3.400 1 3.900 2.400.5-1.400 2-2.400 3.900-2.400 3.100 0 5 3.100 3.600 6.300C19.500 16.400 12 21 12 21Z" fill="currentColor" />);

    case "farmers-day":
      return <Sprout size={size} stage={stage} />;

    case "mothers-day":
      return wrap(
        <>
          <g fill="currentColor">
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="12" cy="6.600" rx="3.200" ry="4.500" transform={`rotate(${a} 12 12)`} />
            ))}
          </g>
          <circle cx="12" cy="12" r="2.800" fill="#fde047" />
        </>
      );

    case "fathers-day":
      return wrap(
        <>
          <path d="M9.800 2.500h4.400l1 3.200H8.800l1-3.200Z" fill="currentColor" />
          <path d="M8.800 6.500h6.400l1.800 12.500L12 22l-5-3L8.800 6.500Z" fill="currentColor" />
          <path d="M12 8.500v9" stroke="#fff" strokeOpacity=".55" strokeWidth="1.400" strokeLinecap="round" />
        </>
      );

    case "girl-child":
      return wrap(
        <>
          <path d="M12 2c.6 4.800 3.200 7.400 8 8-4.800.6-7.400 3.200-8 8-.6-4.800-3.200-7.400-8-8 4.800-.6 7.400-3.200 8-8Z" fill="currentColor" />
          <path d="M19 15c.2 1.600 1 2.400 2.600 2.600-1.600.2-2.400 1-2.600 2.600-.2-1.600-1-2.400-2.600-2.600 1.600-.2 2.400-1 2.600-2.600Z" fill="currentColor" />
        </>
      );

    case "literacy-day":
      return wrap(
        <g {...stroke} strokeWidth={1.8}>
          <path d="M12 6.500C10.500 5.300 8 4.800 4 5v12c4-.2 6.500.3 8 1.500" />
          <path d="M12 6.500c1.500-1.200 4-1.700 8-1.500v12c-4-.2-6.500.3-8 1.500" />
          <path d="M12 6.500v12" />
        </g>
      );

    case "environment-day":
      return wrap(
        <g {...stroke} strokeWidth={1.7}>
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3 12h18M4.500 7.500h15M4.500 16.500h15" />
        </g>
      );

    default:
      return null;
  }
}
