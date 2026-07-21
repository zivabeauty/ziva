import { parsePrice, formatInr } from "@/lib/pricing";

interface PriceProps {
  price: string | number;
  oldPrice?: string | number;
  size?: "sm" | "md" | "lg";
  showDiscount?: boolean;
  className?: string;
}

const SIZES = {
  sm: { now: "text-sm", was: "text-[11px]" },
  md: { now: "text-base", was: "text-xs" },
  lg: { now: "text-2xl font-serif", was: "text-sm" },
};

/** Current price with optional struck-through original and a saving pill. */
export default function Price({
  price,
  oldPrice,
  size = "md",
  showDiscount = true,
  className = "",
}: PriceProps) {
  const now = parsePrice(price);
  const was = parsePrice(oldPrice);
  const hasDiscount = was > now;
  const pct = hasDiscount ? Math.round(((was - now) / was) * 100) : 0;
  const s = SIZES[size];

  return (
    <div className={`flex items-baseline gap-2 flex-wrap ${className}`}>
      <span className={`${s.now} font-semibold text-ink`}>{formatInr(now)}</span>
      {hasDiscount && (
        <span className={`${s.was} text-stone-400 line-through`}>{formatInr(was)}</span>
      )}
      {hasDiscount && showDiscount && (
        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-deep">
          {pct}% off
        </span>
      )}
    </div>
  );
}
