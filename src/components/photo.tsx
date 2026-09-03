import Image from "next/image";

/**
 * A real photo, optionally with a visible caption underneath. Sits
 * alongside PhotoPlaceholder — use this once an actual image exists for a
 * slot, PhotoPlaceholder until then. Images live in /public/photos/.
 */
export function Photo({
  src,
  alt,
  caption,
  aspect = "aspect-[4/3]",
  className = "",
  sizes = "(min-width: 640px) 25vw, 50vw",
}: {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden rounded-2xl border border-brand-200/70 ${aspect}`}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs leading-snug text-ink/55">{caption}</figcaption>
      )}
    </figure>
  );
}
