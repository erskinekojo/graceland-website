import type { ShapeName } from "@/lib/seasons";
import { RibbonGlyph } from "@/components/season-icons";

/**
 * The little shapes that fly out of the floating toys. Everything is drawn in
 * currentColor; the toy sets the colour on the wrapping element.
 */
export function Shape({ shape, size, text }: { shape: ShapeName; size: number; text?: string }) {
  const svg = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true } as const;

  switch (shape) {
    case "heart":
      return (
        <svg {...svg} fill="currentColor">
          <path d="M12 21s-7.5-4.6-9.5-9.2C1.1 8.6 3 5.5 6.1 5.5c1.9 0 3.4 1 3.9 2.4.5-1.4 2-2.4 3.9-2.4 3.1 0 5 3.1 3.6 6.3C19.5 16.4 12 21 12 21Z" />
        </svg>
      );
    case "star":
      return (
        <svg {...svg} fill="currentColor">
          <path d="M12 2l2.9 6.2 6.8.8-5 4.7 1.3 6.7L12 17.4 6 20.4l1.3-6.7-5-4.7 6.8-.8L12 2Z" />
        </svg>
      );
    case "crescent":
      return (
        <svg {...svg} fill="currentColor">
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
        </svg>
      );
    case "ribbon":
      return <RibbonGlyph size={size} />;
    case "flower":
      return (
        <svg {...svg}>
          <g fill="currentColor">
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="12" cy="6.6" rx="3.2" ry="4.5" transform={`rotate(${a} 12 12)`} />
            ))}
          </g>
          <circle cx="12" cy="12" r="2.6" fill="#fde047" />
        </svg>
      );
    case "egg":
      return (
        <svg {...svg}>
          <path d="M12 2.5c-3.5 0-6.5 5.5-6.5 10a6.5 6.5 0 0 0 13 0c0-4.5-3-10-6.5-10Z" fill="currentColor" />
          <path d="M5.9 13.2l2.1-1.5 2.1 1.5 2-1.5 2.1 1.5 2.1-1.5 1.8 1.3" fill="none" stroke="#fff" strokeOpacity=".9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...svg}>
          <path d="M20 4C11 4 5 10 5 19c9 0 15-6 15-15Z" fill="currentColor" />
          <path d="M5 19 14 10" stroke="#fff" strokeOpacity=".6" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "petal":
      return (
        <svg {...svg}>
          <ellipse cx="12" cy="12" rx="5" ry="9" fill="currentColor" transform="rotate(25 12 12)" />
        </svg>
      );
    case "flake":
      return (
        <svg {...svg} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M12 2l-2 2.2M12 2l2 2.2M12 22l-2-2.2M12 22l2-2.2" />
        </svg>
      );
    case "confetti":
      return (
        <svg {...svg}>
          <rect x="8.5" y="3" width="7" height="18" rx="2" fill="currentColor" />
        </svg>
      );
    case "drop":
      return (
        <svg {...svg}>
          <path d="M12 3c3.5 4.5 6 7.5 6 10.5a6 6 0 0 1-12 0C6 10.500 8.500 7.500 12 3Z" fill="currentColor" />
        </svg>
      );
    case "letter":
      return (
        <span
          aria-hidden
          style={{
            display: "block",
            width: size,
            height: size,
            fontSize: size,
            lineHeight: `${size}px`,
            fontWeight: 800,
            textAlign: "center",
            fontFamily: "var(--font-heading)",
          }}
        >
          {text}
        </span>
      );
    case "dot":
      return <span aria-hidden style={{ display: "block", width: size, height: size, borderRadius: "50%", background: "currentColor" }} />;
  }
}
