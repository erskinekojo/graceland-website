"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { SeasonIcon, SnowGlobeArt } from "@/components/season-icons";
import { Shape } from "@/components/season-shapes";
import { ShareButtons } from "@/components/share-buttons";
import { siteUrl } from "@/lib/content";
import { SEASONS, type SeasonId, type ShapeName, type ToyConfig } from "@/lib/seasons";

/**
 * The floating, tappable toy for whichever season is active. All behaviour is
 * driven by that season's ToyConfig in lib/seasons.ts: what flies out, whether
 * a card opens, whether there is a "write a card" box, and so on.
 *
 * The active season is read from <html data-theme>, which the inline script in
 * layout.tsx sets before first paint. The toy is position:fixed, so appearing a
 * moment after hydration causes no layout shift. Nothing renders in normal
 * (unthemed) months.
 */

type Particle = {
  id: number;
  cls: string;
  shape: ShapeName;
  size: number;
  text?: string;
  style: CSSProperties;
};

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const getTheme = () => document.documentElement.getAttribute("data-theme");
const getServerTheme = () => null;

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pickOne = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];

export function SeasonalToy() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const season = SEASONS.find((s) => s.id === theme);
  if (!season?.toy) return null;
  // key resets all toy state if the theme changes while the page is open
  return <Toy key={season.id} id={season.id} toy={season.toy} />;
}

function Toy({ id, toy }: { id: SeasonId; toy: ToyConfig }) {
  const [open, setOpen] = useState(false);
  const [hinted, setHinted] = useState(true);
  const [beat, setBeat] = useState(false);
  const [index, setIndex] = useState(0);
  // Seedling growth stage (1-4). Starts with a visible sprout so the icon is recognisable.
  const [stage, setStage] = useState(1);
  const [toast, setToast] = useState("");
  const [note, setNote] = useState("");
  const [announce, setAnnounce] = useState("");
  const [veil, setVeil] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const idRef = useRef(0);

  const card = toy.card;

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

  function make(
    cls: string,
    size: number,
    vars: Record<string, string | number>,
    opts?: { shape?: ShapeName; color?: string },
  ): Particle {
    const shape = opts?.shape ?? pickOne(toy.shapes);
    const color = opts?.color ?? pickOne(toy.colors);
    return {
      id: idRef.current++,
      cls: `${cls} shape-${shape}`,
      shape,
      size,
      text: shape === "letter" ? pickOne([...(toy.letters ?? "ABC")]) : undefined,
      style: { color, width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, ...vars } as CSSProperties,
    };
  }

  function spawn(batch: Particle[], ms: number) {
    const ids = new Set(batch.map((p) => p.id));
    setParticles((prev) => [...prev, ...batch]);
    window.setTimeout(() => setParticles((prev) => prev.filter((p) => !ids.has(p.id))), ms);
  }

  /** Where the toy sits on screen: particles start here. */
  function origin() {
    const r = buttonRef.current?.getBoundingClientRect();
    return {
      x: r ? r.left + r.width / 2 : window.innerWidth - 48,
      y: r ? r.top + r.height * (toy.bare ? 0.35 : 0.5) : window.innerHeight - 48,
    };
  }

  function burst() {
    const { x, y } = origin();
    spawn(
      Array.from({ length: 24 }, () => {
        const angle = rand(-Math.PI, -0.35 * Math.PI); // fan up and to the left
        const dist = rand(90, 270);
        return make("toy-burst", Math.round(rand(14, 24)), {
          left: x,
          top: y,
          "--dx": `${Math.cos(angle) * dist}px`,
          "--dy": `${Math.sin(angle) * dist}px`,
          "--rot": `${rand(-200, 200)}deg`,
          "--dur": `${rand(1.2, 2.2)}s`,
          "--delay": `${rand(0, 0.15)}s`,
        });
      }),
      2700,
    );
  }

  /** Ribbons that float up the screen, swaying gently like helium balloons. */
  function floatUp() {
    const { x, y } = origin();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // 1) a few lift off from the toy itself and drift across to the left
    const fromToy = Array.from({ length: 14 }, () =>
      make("toy-rise", Math.round(rand(18, 34)), {
        left: x + rand(-12, 12),
        top: y,
        "--rise": `${-(y + 90)}px`,
        "--drift": `${rand(-vw * 0.55, vw * 0.04)}px`,
        "--sway": `${rand(10, 28)}px`,
        "--swaydur": `${rand(1.6, 2.8)}s`,
        "--dur": `${rand(6, 9.5)}s`,
        "--delay": `${rand(0, 0.9)}s`,
      }),
    );
    // 2) then a wave rises from the bottom edge, across the whole width
    const wave = Array.from({ length: vw < 640 ? 14 : 24 }, () =>
      make("toy-rise", Math.round(rand(16, 32)), {
        left: rand(0.03, 0.97) * vw,
        top: vh + 30,
        "--rise": `${-(vh + 120)}px`,
        "--drift": `${rand(-60, 60)}px`,
        "--sway": `${rand(10, 30)}px`,
        "--swaydur": `${rand(1.8, 3.2)}s`,
        "--dur": `${rand(7, 11)}s`,
        "--delay": `${rand(0.6, 3.2)}s`,
      }),
    );
    spawn([...fromToy, ...wave], 15000);
  }

  function fountainFall() {
    const { x, y } = origin();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // 1) a fountain that pops out of the toy, then falls back down
    const fountain = Array.from({ length: 28 }, () =>
      make("toy-fountain", Math.round(rand(12, 24)), {
        left: x,
        top: y,
        "--dx": `${rand(-320, 40)}px`,
        "--peak": `${-rand(110, 340)}px`,
        "--drift": `${rand(-90, 40)}px`,
        "--fall": `${vh - y + 60}px`,
        "--rot": `${rand(-220, 220)}deg`,
        "--dur": `${rand(3.2, 5.2)}s`,
        "--delay": `${rand(0, 0.35)}s`,
      }),
    );
    // 2) a gentle fall across the whole screen
    const fall = Array.from({ length: vw < 640 ? 28 : 48 }, () =>
      make("toy-fall", Math.round(rand(8, 20)), {
        left: rand(0, vw),
        top: 0,
        "--drift": `${rand(-80, 80)}px`,
        "--rot": `${rand(-360, 360)}deg`,
        "--dur": `${rand(5.5, 9.5)}s`,
        "--delay": `${rand(0.2, 2.8)}s`,
      }),
    );
    spawn([...fountain, ...fall], 12500);
  }

  function fireworks() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale = vw < 640 ? 0.7 : 1;
    const batch: Particle[] = [];
    for (let b = 0; b < 4; b++) {
      const cx = rand(0.15, 0.85) * vw;
      const cy = rand(0.14, 0.5) * vh;
      const baseDelay = b * 0.45 + rand(0, 0.2);
      const c1 = pickOne(toy.colors);
      const c2 = pickOne(toy.colors);
      const n = 22;
      for (let k = 0; k < n; k++) {
        const angle = (k / n) * Math.PI * 2 + rand(-0.1, 0.1);
        const dist = rand(55, 125) * scale;
        batch.push(
          make(
            "toy-spark",
            Math.round(rand(5, 8)),
            {
              left: cx,
              top: cy,
              "--dx": `${Math.cos(angle) * dist}px`,
              "--dy": `${Math.sin(angle) * dist}px`,
              "--dur": `${rand(1.1, 1.7)}s`,
              "--delay": `${baseDelay + rand(0, 0.08)}s`,
            },
            { shape: "dot", color: k % 2 ? c1 : c2 },
          ),
        );
      }
    }
    setVeil(true);
    window.setTimeout(() => setVeil(false), 4300);
    spawn(batch, 4300);
  }

  /** Water drops falling onto the seedling. */
  function waterDrops() {
    const { x, y } = origin();
    spawn(
      Array.from({ length: 9 }, () =>
        make(
          "toy-drop",
          Math.round(rand(8, 13)),
          { left: x + rand(-18, 18), top: y - 8, "--dx": `${rand(-6, 6)}px`, "--dur": `${rand(0.8, 1.3)}s`, "--delay": `${rand(0, 0.45)}s` },
          { shape: "drop", color: pickOne(["#38bdf8", "#0284c7", "#7dd3fc"]) },
        ),
      ),
      2000,
    );
  }

  function onTap() {
    setHinted(false);
    setBeat(true);
    window.setTimeout(() => setBeat(false), 650);
    setAnnounce(toy.announce);

    if (card) {
      if (open && !card.maker) setIndex((i) => (i + 1) % card.messages.length);
      setOpen(true);
    }
    if (toy.toast) {
      setToast(toy.toast);
      window.setTimeout(() => setToast(""), 2600);
    }

    // The seedling still grows for people who prefer reduced motion.
    let harvested = false;
    if (toy.effect === "grow") {
      const next = stage >= 4 ? 1 : stage + 1;
      setStage(next);
      harvested = next === 4;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    switch (toy.effect) {
      case "burst":
        burst();
        break;
      case "float":
        floatUp();
        break;
      case "fountain-fall":
        fountainFall();
        break;
      case "fireworks":
        fireworks();
        break;
      case "grow":
        waterDrops();
        if (harvested) burst();
        break;
    }
  }

  const shareTitle = card?.maker ? note.trim() || card.maker.defaultMessage : card?.share?.title;
  const shareUrl = card?.maker ? siteUrl : card?.share ? `${siteUrl}${card.share.path === "/" ? "" : card.share.path}` : undefined;

  return (
    <div ref={rootRef}>
      {/* Full-screen layer for flying shapes. Never intercepts clicks. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
        {veil && <div className="toy-veil absolute inset-0" />}
        {particles.map((p) => (
          <span key={p.id} style={p.style} className={`toy-particle ${p.cls} absolute block`}>
            {p.cls.includes("toy-rise") ? (
              // inner wrapper sways side to side while the outer one rises
              <span className="toy-sway block">
                <Shape shape={p.shape} size={p.size} text={p.text} />
              </span>
            ) : (
              <Shape shape={p.shape} size={p.size} text={p.text} />
            )}
          </span>
        ))}
      </div>

      <div className="fixed bottom-5 right-5 z-40">
        {open && card && (
          <div
            role="region"
            aria-label={card.title}
            className="pop-in absolute bottom-full right-0 mb-3 w-[min(20rem,calc(100vw-2.5rem))] rounded-2xl border border-brand-100 bg-white p-4 shadow-xl shadow-brand-900/15"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-heading text-xs font-semibold uppercase tracking-wide text-brand-600">{card.title}</p>
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

            {card.maker ? (
              <>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">{card.messages[0]}</p>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={160}
                  rows={3}
                  placeholder={card.maker.placeholder}
                  aria-label={card.maker.placeholder}
                  className="mt-3 w-full resize-none rounded-xl border border-brand-200 bg-white px-3 py-2 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
                <p className="mt-1 text-right text-xs text-ink/45">{note.length}/160</p>
              </>
            ) : (
              <>
                <p aria-live="polite" className="mt-2 min-h-[4.5rem] text-sm leading-relaxed text-ink/80">
                  {card.messages[index]}
                </p>
                {card.messages.length > 1 && (
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-brand-100 pt-3">
                    <button
                      type="button"
                      onClick={() => setIndex((i) => (i + 1) % card.messages.length)}
                      className="text-sm font-semibold text-brand-700 hover:text-brand-800"
                    >
                      Next →
                    </button>
                    <span className="text-xs text-ink/50">
                      {index + 1} / {card.messages.length}
                    </span>
                  </div>
                )}
              </>
            )}

            {shareTitle && shareUrl && (
              <div className="mt-3 [&>div]:flex-wrap">
                <ShareButtons url={shareUrl} title={shareTitle} />
              </div>
            )}
          </div>
        )}

        <div className="relative">
          {(hinted || toast) && (
            <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full border border-brand-100 bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-md">
              {toast || toy.hint}
            </span>
          )}

          <button
            ref={buttonRef}
            type="button"
            onClick={onTap}
            aria-expanded={card ? open : undefined}
            aria-label={toy.ariaLabel}
            className={
              toy.bare
                ? `toy-float block rounded-full drop-shadow-lg transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                    beat ? "toy-shake" : ""
                  }`
                : `toy-glow relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-600 shadow-lg shadow-brand-900/20 ring-1 ring-brand-200 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                    toy.effect === "float" ? "toy-bob" : ""
                  } ${beat ? "toy-beat" : ""}`
            }
          >
            {toy.bare ? <SnowGlobeArt size={56} /> : <SeasonIcon id={id} size={32} stage={stage} draw />}
          </button>

          <p role="status" className="sr-only">
            {announce}
          </p>
        </div>
      </div>
    </div>
  );
}
