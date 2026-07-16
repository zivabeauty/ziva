import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  reviews?: number;
  size?: "sm" | "md";
  className?: string;
}

/** Gold five-star rating with an optional review count. */
export default function Rating({ value, reviews, size = "sm", className = "" }: RatingProps) {
  const star = size === "md" ? "w-3.5 h-3.5" : "w-3 h-3";
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex gap-px" aria-label={`Rated ${value} out of 5`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${star} ${i < value ? "fill-gold text-gold" : "fill-stone-200 text-stone-200"}`}
          />
        ))}
      </div>
      {typeof reviews === "number" && (
        <span className="text-[10px] text-stone-400 font-medium">
          ({reviews.toLocaleString("en-IN")})
        </span>
      )}
    </div>
  );
}
