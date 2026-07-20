"use client";

/**
 * Scrolling brand-promise band shown under the hero — two espresso ticker rows
 * running in opposite directions with a centered message between them.
 *
 * Keyframes are declared inline and the animation is applied via inline style
 * so it never collides with Tailwind's `animate-*` utility namespace.
 */

const TAGS = [
  "Paraben Free",
  "Vegetarian",
  "Cruelty Free",
  "Dermatologist Tested",
  "Sulphate Free",
];

function TagGroup() {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {TAGS.map((tag, i) => (
        <li key={i} className="flex items-center">
          <span className="px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-cream/90 sm:text-xs sm:tracking-[0.22em]">
            {tag}
          </span>
          <span className="h-1 w-1 rounded-full bg-gold/70" />
        </li>
      ))}
    </ul>
  );
}

function MarqueeRow({ direction }: { direction: "left" | "right" }) {
  const name = direction === "left" ? "ziva-marquee-left" : "ziva-marquee-right";
  return (
    <div className="overflow-hidden bg-ink py-2.5">
      <div className="flex w-max" style={{ animation: `${name} 12s linear infinite` }}>
        {/* Two identical groups → seamless -50% loop */}
        <TagGroup />
        <TagGroup />
      </div>
    </div>
  );
}

export default function BrandMarquee() {
  return (
    <section aria-label="Our promise" className="select-none">
      <style>{`
        @keyframes ziva-marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes ziva-marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>

      <MarqueeRow direction="left" />

      <div className="bg-cream px-4 py-4 text-center sm:px-6 lg:px-8">
        <p className="text-xl  text-ink sm:text-xl">
        We&apos;ve got everything you need to look and feel your best.{" "}
          
        </p>
      </div>

      <MarqueeRow direction="right" />
    </section>
  );
}
