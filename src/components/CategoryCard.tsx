"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  count?: string;
  image: string;
  href: string;
}

/** Premium image-forward category tile that links into a filtered catalog view. */
export default function CategoryCard({ name, count, image, href }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-[24px] bg-porcelain shadow-[0_10px_30px_rgba(61,36,18,0.06)] ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_50px_rgba(61,36,18,0.16)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
        />
        {/* Espresso scrim for legible label — dense at the base where the text sits */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-ink/5" />

        {/* Hover arrow badge */}
        <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-cream/90 text-ink opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>

        {/* Label — text-shadow guarantees legibility even over a bright image edge */}
        <div className="absolute inset-x-0 bottom-0 p-4 text-left [text-shadow:0_1px_14px_rgba(61,36,18,0.6)] sm:p-5">
          {count && (
            <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.22em] text-gold sm:text-[10px]">
              {count}
            </span>
          )}
          <span className="block font-serif text-base leading-tight text-cream sm:text-lg">
            {name}
          </span>
          <span className="mt-2 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-cream/80 transition-colors group-hover:text-gold sm:text-[10px]">
            Shop Now
            <span className="h-px w-5 bg-gold transition-all duration-500 group-hover:w-8" />
          </span>
        </div>
      </div>
    </Link>
  );
}
