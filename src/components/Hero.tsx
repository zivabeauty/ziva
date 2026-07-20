"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { heroSlides } from "@/data/beautyData";

const AUTOPLAY_MS = 6500;
const pad = (n: number) => String(n + 1).padStart(2, "0");

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused || count <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, count]);

  const slide = heroSlides[index];
  const mobileSrc = slide.mobileImage ?? slide.image;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative w-full bg-porcelain"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* The image sets the height exactly — full width, its own natural aspect
          ratio — so there's no cropping, stretching or empty space whatever the
          image's dimensions are. */}
    <Link
  href="/products"
  aria-label={`${slide.title} ${slide.titleAccent}`}
  className="block w-full sm:h-[70vh] overflow-hidden"
>
  
  <img
    src={slide.image}
    alt={`${slide.title} ${slide.titleAccent} — ${slide.tagline}`}
    loading={index === 0 ? "eager" : "lazy"}
    className=" h-full w-full object-cover object-center "
  />
</Link>

      {count > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center border border-ink/20 bg-cream/80 text-ink backdrop-blur-sm transition-colors hover:bg-cream sm:flex"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center border border-ink/20 bg-cream/80 text-ink backdrop-blur-sm transition-colors hover:bg-cream sm:flex"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${pad(i)}`}
                className={`h-1 rounded-full bg-ink transition-all duration-300 ${
                  i === index ? "w-8 opacity-90" : "w-2 opacity-35 hover:opacity-60"
                }`}
              />
            ))}
          </div>
        </>
      )}    </section>
  );
}
