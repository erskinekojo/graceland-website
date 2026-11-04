"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { GalleryPhoto } from "@/lib/gallery";
import "./gallery-show.css";

/**
 * The gallery: a full-height slideshow with a captioned photo, autoplay,
 * shuffle, category filters, a thumbnail strip, keyboard and swipe controls,
 * and full screen. Photos come in as props from the server (see lib/gallery.ts).
 */

const SLIDE_MS = 6500;

// ---- small helpers -------------------------------------------------------

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(items: T[], seed: number): T[] {
  const rand = mulberry32(seed);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
}

function useMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const subscribeVisibility = (onChange: () => void) => {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
};
const subscribeFullscreen = (onChange: () => void) => {
  document.addEventListener("fullscreenchange", onChange);
  return () => document.removeEventListener("fullscreenchange", onChange);
};

// ---- icons ---------------------------------------------------------------

const icon = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

const Prev = () => (
  <svg {...icon}><path d="m15 18-6-6 6-6" /></svg>
);
const Next = () => (
  <svg {...icon}><path d="m9 18 6-6-6-6" /></svg>
);
const Play = () => (
  <svg {...icon} fill="currentColor" stroke="none"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
);
const Pause = () => (
  <svg {...icon} fill="currentColor" stroke="none"><rect x="6" y="5" width="4" height="14" rx="1.2" /><rect x="14" y="5" width="4" height="14" rx="1.2" /></svg>
);
const Shuffle = () => (
  <svg {...icon}><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" /></svg>
);
const Expand = () => (
  <svg {...icon}><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" /></svg>
);
const Compress = () => (
  <svg {...icon}><path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3" /></svg>
);

const round =
  "flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// ---- the component -------------------------------------------------------

type View = {
  cat: string; // "All" or a category name
  seed: number | null; // null = curated order, number = shuffled with this seed
  index: number;
  userPlaying: boolean | null; // null = default (play, unless the visitor prefers reduced motion)
};

export function GalleryShow({ photos, categories }: { photos: GalleryPhoto[]; categories: readonly string[] }) {
  const [view, setView] = useState<View>({ cat: "All", seed: null, index: 0, userPlaying: null });
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const hidden = useSyncExternalStore(
    subscribeVisibility,
    () => document.hidden,
    () => false,
  );
  const fullscreen = useSyncExternalStore(
    subscribeFullscreen,
    () => Boolean(document.fullscreenElement),
    () => false,
  );
  const canFullscreen = useSyncExternalStore(
    () => () => {},
    () => document.fullscreenEnabled,
    () => false,
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const swipe = useRef<number | null>(null);

  const list = useMemo(() => {
    const pool = view.cat === "All" ? photos : photos.filter((p) => p.category === view.cat);
    return view.seed === null ? pool : shuffled(pool, view.seed);
  }, [photos, view.cat, view.seed]);

  const n = list.length;
  const index = n ? Math.min(view.index, n - 1) : 0;
  const playing = (view.userPlaying ?? !reduced) && !hidden;
  const photo = list[index];

  const go = (delta: number) =>
    setView((v) => ({ ...v, index: n ? (((Math.min(v.index, n - 1) + delta) % n) + n) % n : 0 }));
  const jump = (i: number) => setView((v) => ({ ...v, index: i }));
  const togglePlay = () => setView((v) => ({ ...v, userPlaying: !(v.userPlaying ?? !reduced) }));
  const toggleShuffle = () =>
    setView((v) => ({ ...v, seed: v.seed === null ? Math.floor(Math.random() * 2 ** 31) : null, index: 0 }));
  const setCategory = (cat: string) => setView((v) => ({ ...v, cat, index: 0 }));

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void rootRef.current?.requestFullscreen?.();
  };

  // Autoplay: advance after SLIDE_MS. Any change of slide restarts the clock.
  useEffect(() => {
    if (!playing || n < 2) return;
    const t = window.setTimeout(() => go(1), SLIDE_MS);
    return () => window.clearTimeout(t);
    // go() only calls setView with a functional update, so it is safe to omit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index, n, view.cat, view.seed]);

  // Keyboard: arrows move, space plays/pauses, F toggles full screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === " " && !(el && (el.tagName === "BUTTON" || el.tagName === "A"))) {
        e.preventDefault();
        togglePlay();
      } else if (e.key.toLowerCase() === "f" && document.fullscreenEnabled) {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, reduced]);

  // Keep the current thumbnail centred in the strip (scrolls the strip only, never the page).
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !thumb) return;
    strip.scrollTo({
      left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [index, view.cat, view.seed, reduced]);

  if (!photo) return null;

  // Render the current slide plus its neighbours: the previous one fades out
  // while the next is already loaded and waiting.
  const near = new Set([index, (index + 1) % n, (index - 1 + n) % n]);

  return (
    <div
      ref={rootRef}
      className={`gal-root flex flex-col bg-brand-950 text-white ${playing ? "" : "is-paused"} h-[calc(100svh-4.5rem)] min-h-[36rem] ${
        fullscreen ? "!h-screen" : ""
      }`}
    >
      {/* Title and filters */}
      <div className="flex flex-col gap-3 px-5 pt-5 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-heading text-xs font-semibold uppercase tracking-widest text-brand-300">Gallery</span>
          <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">A glimpse into life at Graceland</h1>
        </div>
        <div role="group" aria-label="Filter photos" className="gal-strip -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={view.cat === c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                view.cat === c ? "bg-white text-brand-950" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {c === "All" ? "All photos" : c}
            </button>
          ))}
        </div>
      </div>

      {/* The stage */}
      <div
        className="relative mt-4 min-h-0 flex-1 touch-pan-y overflow-hidden"
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("button, a")) return;
          swipe.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (swipe.current === null) return;
          const dx = e.clientX - swipe.current;
          swipe.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => (swipe.current = null)}
        role="group"
        aria-roledescription="carousel"
        aria-label="Photo slideshow"
      >
        {[...near].map((i) => {
          const p = list[i];
          const current = i === index;
          return (
            <div
              key={p.src}
              aria-hidden={!current}
              className={`gal-slide absolute inset-0 transition-opacity duration-1000 ${current ? "is-current z-10 opacity-100" : "z-0 opacity-0"}`}
            >
              {/* Soft, blurred copy of the photo fills the space around it */}
              <Image src={p.src} alt="" fill sizes="12vw" loading="eager" className="scale-125 object-cover opacity-50 blur-3xl" />
              <div className="absolute inset-0 px-3 py-2 sm:px-10 sm:py-4">
                <div className="gal-kb relative h-full w-full">
                  <Image
                    src={p.src}
                    alt={current ? p.alt : ""}
                    fill
                    sizes="(min-width: 1280px) 1100px, 100vw"
                    loading="eager"
                    fetchPriority={current && index === 0 ? "high" : "auto"}
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* Side arrows (large screens) */}
        {n > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${round} absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 bg-black/30 backdrop-blur md:flex`}>
              <Prev />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${round} absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 bg-black/30 backdrop-blur md:flex`}>
              <Next />
            </button>
          </>
        )}

        {playing && n > 1 && (
          <div
            key={`${photo.src}-${view.cat}-${view.seed}`}
            className="gal-progress absolute inset-x-0 bottom-0 z-20 h-1 bg-white/80"
            style={{ "--ms": `${SLIDE_MS}ms` } as React.CSSProperties}
          />
        )}
      </div>

      {/* Caption and controls */}
      <div className="px-5 pb-4 pt-4 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div key={photo.src} className="gal-rise min-w-0 md:max-w-2xl" aria-live={playing ? "off" : "polite"} aria-atomic="true">
            <p className="flex flex-wrap items-center gap-x-2 text-xs font-semibold uppercase tracking-wider text-brand-300">
              <span>{photo.category}</span>
              {photo.story && (
                <>
                  <span aria-hidden>·</span>
                  <span>{formatMonth(photo.story.date)}</span>
                </>
              )}
            </p>
            <p className="mt-1 font-heading text-lg font-semibold leading-snug sm:text-xl">{photo.caption}</p>
            {photo.story && (
              <Link
                href={`/blog/${photo.story.slug}`}
                className="mt-1 inline-block text-sm text-white/75 underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-white"
              >
                Read the story: {photo.story.title}
              </Link>
            )}
          </div>

          <div className="gal-controls flex items-center gap-2">
            <span className="mr-1 text-sm tabular-nums text-white/70" aria-label={`Photo ${index + 1} of ${n}`}>
              {index + 1} / {n}
            </span>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${round} md:hidden`}>
              <Prev />
            </button>
            <button type="button" onClick={togglePlay} aria-label={playing ? "Pause slideshow" : "Play slideshow"} className={round}>
              {playing ? <Pause /> : <Play />}
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${round} md:hidden`}>
              <Next />
            </button>
            <button
              type="button"
              onClick={toggleShuffle}
              aria-pressed={view.seed !== null}
              aria-label="Shuffle photos"
              title="Shuffle"
              className={`${round} ${view.seed !== null ? "!bg-white !text-brand-950" : ""}`}
            >
              <Shuffle />
            </button>
            {canFullscreen && (
              <button type="button" onClick={toggleFullscreen} aria-label={fullscreen ? "Exit full screen" : "View full screen"} title="Full screen (F)" className={round}>
                {fullscreen ? <Compress /> : <Expand />}
              </button>
            )}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div ref={stripRef} className="gal-strip mt-4 flex gap-2 overflow-x-auto pb-1 pr-20 sm:pr-24" role="list" aria-label="All photos">
          {list.map((p, i) => (
            <button
              key={p.src}
              role="listitem"
              type="button"
              onClick={() => jump(i)}
              aria-label={`Show photo ${i + 1}: ${p.caption}`}
              aria-current={i === index}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                i === index ? "opacity-100 ring-2 ring-white" : "opacity-55 hover:opacity-100"
              }`}
            >
              <Image src={p.src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
