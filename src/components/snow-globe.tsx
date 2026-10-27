"use client";

import { useRef, useState, type CSSProperties } from "react";

/**
 * Interactive snow globe for Christmas. Tapping it shakes the globe, fires a
 * fountain of snowflakes out of it, and starts a gentle snowfall across the
 * whole screen for a few seconds. The snow never blocks clicks.
 *
 * Only visible while html[data-theme="christmas"] (see globals.css).
 */

// Pale blues plus white with a soft outline, so the snow shows on cream *and*
// on the dark footer.
const SNOW = ["#7dd3fc", "#bae6fd", "#93c5fd", "#ffffff", "#e0f2fe"];

type Flake = { id: number; kind: "fountain" | "fall"; size: number; style: CSSProperties };

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function FlakeShape() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M12 2v20M3.340 7l17.320 10M3.340 17 20.660 7M12 2l-2 2.200M12 2l2 2.200M12 22l-2-2.200M12 22l2-2.200" />
    </svg>
  );
}

function GlobeArt() {
  return (
    <svg viewBox="0 0 64 72" width="56" height="63" aria-hidden>
      <defs>
        <clipPath id="snow-globe-glass">
          <circle cx="32" cy="30" r="25" />
        </clipPath>
      </defs>
      {/* base */}
      <path d="M14 58h36l3 11H11l3-11Z" fill="#b91c1c" />
      <rect x="12" y="55" width="40" height="6" rx="3" fill="#fcd34d" />
      {/* glass */}
      <circle cx="32" cy="30" r="26" fill="#e0f2fe" fillOpacity=".6" stroke="#7dd3fc" strokeWidth="2" />
      <g clipPath="url(#snow-globe-glass)">
        <ellipse cx="32" cy="53" rx="28" ry="13" fill="#ffffff" />
        <rect x="30" y="41" width="4" height="7" fill="#7c4a1e" />
        <path d="M32 13 22 27h20L32 13Z" fill="#15803d" />
        <path d="M32 19 20 35h24L32 19Z" fill="#16a34a" />
        <path d="M32 26 18 43h28L32 26Z" fill="#15803d" />
        <circle cx="32" cy="12" r="2.200" fill="#fcd34d" />
        <circle cx="19" cy="20" r="1.300" fill="#fff" />
        <circle cx="45" cy="24" r="1.300" fill="#fff" />
        <circle cx="14" cy="33" r="1.100" fill="#fff" />
        <circle cx="50" cy="36" r="1.100" fill="#fff" />
        <circle cx="26" cy="9" r="1" fill="#fff" />
      </g>
      <path d="M15 24a18 18 0 0 1 11-12" stroke="#ffffff" strokeWidth="2.500" strokeLinecap="round" fill="none" opacity=".85" />
    </svg>
  );
}

export function SnowGlobe() {
  const [flakes, setFlakes] = useState<Flake[]>([]);
  const [shaking, setShaking] = useState(false);
  const [hinted, setHinted] = useState(true);
  const [announce, setAnnounce] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const idRef = useRef(0);

  function makeItSnow() {
    setHinted(false);
    setShaking(true);
    window.setTimeout(() => setShaking(false), 750);
    setAnnounce("Snow is falling. Merry Christmas from Graceland Montessori.");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const rect = buttonRef.current?.getBoundingClientRect();
    const originX = rect ? rect.left + rect.width / 2 : window.innerWidth - 48;
    const originY = rect ? rect.top + rect.height * 0.35 : window.innerHeight - 70;
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    // 1) A fountain that pops out of the globe, then falls back down.
    const fountain: Flake[] = Array.from({ length: 28 }, () => {
      const size = Math.round(rand(12, 24));
      return {
        id: idRef.current++,
        kind: "fountain",
        size,
        style: {
          left: originX,
          top: originY,
          width: size,
          height: size,
          color: SNOW[Math.floor(Math.random() * SNOW.length)],
          ["--dx" as string]: `${rand(-320, 40)}px`,
          ["--peak" as string]: `${-rand(110, 340)}px`,
          ["--drift" as string]: `${rand(-90, 40)}px`,
          ["--fall" as string]: `${vh - originY + 60}px`,
          ["--rot" as string]: `${rand(-220, 220)}deg`,
          ["--dur" as string]: `${rand(3.2, 5.2)}s`,
          ["--delay" as string]: `${rand(0, 0.35)}s`,
        } as CSSProperties,
      };
    });

    // 2) A gentle snowfall across the whole screen.
    const count = vw < 640 ? 28 : 48;
    const fall: Flake[] = Array.from({ length: count }, () => {
      const size = Math.round(rand(8, 20));
      return {
        id: idRef.current++,
        kind: "fall",
        size,
        style: {
          left: rand(0, vw),
          top: 0,
          width: size,
          height: size,
          color: SNOW[Math.floor(Math.random() * SNOW.length)],
          ["--drift" as string]: `${rand(-80, 80)}px`,
          ["--rot" as string]: `${rand(-360, 360)}deg`,
          ["--dur" as string]: `${rand(5.5, 9.5)}s`,
          ["--delay" as string]: `${rand(0.2, 2.8)}s`,
        } as CSSProperties,
      };
    });

    const batch = [...fountain, ...fall];
    const ids = new Set(batch.map((f) => f.id));
    setFlakes((prev) => [...prev, ...batch]);
    window.setTimeout(() => setFlakes((prev) => prev.filter((f) => !ids.has(f.id))), 12500);
  }

  return (
    <div className="christmas-only">
      {/* Full-screen snow layer. Never intercepts clicks. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
        {flakes.map((f) => (
          <span
            key={f.id}
            style={f.style}
            className={`flake ${f.kind === "fountain" ? "flake-fountain" : "flake-fall"} absolute -ml-2 -mt-2 block`}
          >
            <FlakeShape />
          </span>
        ))}
      </div>

      <div className="fixed bottom-5 right-5 z-40">
        {hinted && (
          <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full border border-sun-100 bg-white px-3 py-1.5 text-xs font-semibold text-sun-600 shadow-md">
            Tap for snow
          </span>
        )}
        <button
          ref={buttonRef}
          type="button"
          onClick={makeItSnow}
          aria-label="Snow globe: tap to make it snow"
          className={`globe-float block rounded-full drop-shadow-lg transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun-600 ${
            shaking ? "globe-shake" : ""
          }`}
        >
          <GlobeArt />
        </button>
        <p role="status" className="sr-only">
          {announce}
        </p>
      </div>
    </div>
  );
}
