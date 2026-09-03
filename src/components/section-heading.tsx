export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  tone = "light",
}: {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** "light" = for light backgrounds (default), "dark" = for dark/brand-950 backgrounds */
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {kicker && (
        <span
          className={`font-heading text-sm font-semibold uppercase tracking-wide ${
            isDark ? "text-brand-300" : "text-brand-600"
          }`}
        >
          {kicker}
        </span>
      )}
      <h2
        className={`mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl ${
          isDark ? "text-white" : "text-brand-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            isDark ? "text-brand-100/75" : "text-ink/70"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
