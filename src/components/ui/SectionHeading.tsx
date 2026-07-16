import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  /** Optional editorial index, e.g. "01" — renders as a serif numeral before the eyebrow. */
  index?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  /** Use on dark (ink) backgrounds to flip title/subtitle colors to cream. */
  tone?: "dark" | "light";
  className?: string;
}

/**
 * Consistent premium section header — an optional numbered index + gold
 * eyebrow kicker, an oversized serif display title, and an optional lead
 * paragraph. The confident type scale and editorial numbering are what make
 * repeated sections feel curated rather than templated.
 */
export default function SectionHeading({
  eyebrow,
  index,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  const dark = tone === "dark";
  // Accent color must flip with the band: sand reads on espresso, cocoa reads on ivory.
  const accent = dark ? "text-gold" : "text-gold-deep";
  const rule = dark ? "from-gold" : "from-gold-deep";

  return (
    <div
      className={`flex flex-col ${centered ? "items-center text-center" : "items-start text-left"} ${className}`}
    >
      {(eyebrow || index) && (
        <span className={`mb-5 flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
          {index && (
            <span className={`font-serif text-base italic ${accent}`}>{index}</span>
          )}
          <span className={`h-px w-8 bg-gradient-to-r ${rule} to-transparent`} />
          {eyebrow && (
            <span className={`text-[0.66rem] font-semibold uppercase tracking-[0.32em] ${accent}`}>
              {eyebrow}
            </span>
          )}
        </span>
      )}

      <h2
        className={`display-xl text-4xl sm:text-5xl lg:text-6xl ${dark ? "on-dark text-cream" : "text-ink"}`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-5 max-w-xl text-sm font-light leading-relaxed sm:text-[15px] ${
            dark ? "text-cream/60" : "text-stone-500"
          } ${centered ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
