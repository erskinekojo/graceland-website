"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ShareButtons } from "@/components/share-buttons";
import { siteUrl } from "@/lib/content";

/**
 * Interactive pink ribbon for Pink October. A floating ribbon that draws itself
 * on screen; tapping it releases a burst of mini ribbons and hearts and opens a
 * small card with an awareness message (and share links).
 *
 * Only visible while html[data-theme="pink-october"] (see globals.css). The
 * messages are deliberately general awareness, not medical advice.
 */

const MESSAGES = [
  "Early detection saves lives.",
  "Know how your breasts normally look and feel, and tell a health professional about any change.",
  "Ask your doctor or clinic when screening is right for you.",
  "Anyone can be affected, including men. Awareness is for everyone.",
  "Check in on someone you love today, and encourage them to book a check-up.",
];

const SHARE_TITLE =
  "October is Breast Cancer Awareness Month. Early detection saves lives. See how Graceland Montessori hosted a community screening:";
const SHARE_URL = `${siteUrl}/blog/breast-cancer-awareness-screening`;

const PINKS = ["#be185d", "#db2777", "#ec4899", "#f472b6", "#f9a8d4"];

type Particle = { id: number; kind: "ribbon" | "heart"; size: number; style: CSSProperties };

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function RibbonShape({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path
        pathLength={1}
        d="M16 3.500c-3.600 0-6 2.500-6 5.600 0 4.600 6 8 6 8s6-3.400 6-8c0-3.100-2.400-5.600-6-5.600Z"
      />
      <path pathLength={1} d="M16 17.100 9.500 28.500M16 17.100 22.500 28.500" />
    </svg>
  );
}

function HeartShape({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 21s-7.500-4.600-9.500-9.200C1.100 8.600 3 5.500 6.100 5.500c1.900 0 3.400 1 3.900 2.400.5-1.400 2-2.400 3.900-2.400 3.100 0 5 3.100 3.600 6.300C19.500 16.400 12 21 12 21Z" />
    </svg>
  );
}

export function PinkRibbon() {
  const [open, setOpen] = useState(false);
  const [hinted, setHinted] = useState(true);
  const [beat, setBeat] = useState(false);
  const [index, setIndex] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  // Close the card with Escape or a tap outside it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  function burst() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const batch: Particle[] = Array.from({ length: 24 }, () => {
      const angle = rand(-Math.PI, -0.35 * Math.PI); // fan up and to the left
      const dist = rand(90, 270);
      return {
        id: idRef.current++,
        kind: Math.random() < 0.65 ? "ribbon" : "heart",
        size: Math.round(rand(14, 24)),
        style: {
          color: PINKS[Math.floor(Math.random() * PINKS.length)],
          ["--dx" as string]: `${Math.cos(angle) * dist}px`,
          ["--dy" as string]: `${Math.sin(angle) * dist}px`,
          ["--rot" as string]: `${rand(-200, 200)}deg`,
          ["--dur" as string]: `${rand(1.2, 2.2)}s`,
          ["--delay" as string]: `${rand(0, 0.15)}s`,
        } as CSSProperties,
      };
    });
    const ids = new Set(batch.map((p) => p.id));
    setParticles((prev) => [...prev, ...batch]);
    window.setTimeout(() => setParticles((prev) => prev.filter((p) => !ids.has(p.id))), 2600);
  }

  function onRibbonClick() {
    setHinted(false);
    if (open) setIndex((i) => (i + 1) % MESSAGES.length);
    setOpen(true);
    setBeat(true);
    window.setTimeout(() => setBeat(false), 600);
    burst();
  }

  return (
    <div ref={rootRef} className="pink-october-only fixed bottom-5 right-5 z-40">
      {open && (
        <div
          role="region"
          aria-label="Pink October awareness"
          className="pop-in absolute bottom-full right-0 mb-3 w-[min(20rem,calc(100vw-2.5rem))] rounded-2xl border border-brand-100 bg-white p-4 shadow-xl shadow-brand-900/15"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="font-heading text-xs font-semibold uppercase tracking-wide text-brand-600">
              Pink October
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="-mr-1 -mt-1 flex h-7 w-7 items-center justify-center rounded-full text-ink/50 transition hover:bg-brand-50 hover:text-brand-700"
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p aria-live="polite" className="mt-2 min-h-[4.5rem] text-sm leading-relaxed text-ink/80">
            {MESSAGES[index]}
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-brand-100 pt-3">
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % MESSAGES.length)}
              className="text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Next message →
            </button>
            <span className="text-xs text-ink/50">
              {index + 1} / {MESSAGES.length}
            </span>
          </div>
          <div className="mt-3 [&>div]:flex-wrap">
            <ShareButtons url={SHARE_URL} title={SHARE_TITLE} />
          </div>
        </div>
      )}

      <div className="relative">
        {hinted && (
          <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full border border-brand-100 bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-md">
            Tap the ribbon
          </span>
        )}

        <button
          type="button"
          onClick={onRibbonClick}
          aria-expanded={open}
          aria-label="Pink ribbon: tap for a breast cancer awareness message"
          className={`pr-glow relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-600 shadow-lg shadow-brand-900/20 ring-1 ring-brand-200 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
            beat ? "pr-beat" : ""
          }`}
        >
          <RibbonShape size={32} className="pr-draw" />
        </button>

        {/* Burst particles, centred on the button */}
        {particles.map((p) => (
          <span
            key={p.id}
            aria-hidden
            style={p.style}
            className="pr-particle pointer-events-none absolute left-1/2 top-1/2 -ml-2 -mt-2"
          >
            {p.kind === "ribbon" ? <RibbonShape size={p.size} /> : <HeartShape size={p.size} />}
          </span>
        ))}
      </div>
    </div>
  );
}
