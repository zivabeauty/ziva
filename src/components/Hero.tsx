"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { heroSlides } from "@/data/beautyData";

const AUTOPLAY_MS = 6500;
const pad = (n: number) => String(n + 1).padStart(2, "0");

/**
 * Image-only hero carousel. The banner artwork itself carries the headline
 * and call-to-action — no overlaid copy or buttons are rendered here.
 */
export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  // Autoplay (pauses on hover / focus)
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, count]);

  const slide = heroSlides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative w-full overflow-hidden bg-porcelain aspect-[3/2] min-h-[240px] max-h-[46vh] sm:aspect-auto sm:max-h-[720px] sm:h-[74vh] sm:min-h-[460px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Slides — full-bleed banner artwork, slow Ken Burns push-in.
          The whole banner links through to the shop. */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 8, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          <Link
            href="/products"
            aria-label={`${slide.title} ${slide.titleAccent}`}
            className="block h-full w-full"
          >
            <Image
              src={slide.image}
              alt={`${slide.title} ${slide.titleAccent} — ${slide.tagline}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-contain object-center sm:object-cover"
            />
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="absolute left-5 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center border border-ink/25 bg-white/70 text-ink backdrop-blur-sm transition-colors duration-300 hover:border-ink hover:bg-white sm:flex lg:left-10"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next slide"
        className="absolute right-5 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center border border-ink/25 bg-white/70 text-ink backdrop-blur-sm transition-colors duration-300 hover:border-ink hover:bg-white sm:flex lg:right-10"
      >
        <ArrowRight className="h-4 w-4" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5 sm:bottom-7">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${pad(i)}`}
            className={`h-2 rounded-full bg-ink transition-all duration-300 ${
              i === index ? "w-7 opacity-90" : "w-2 opacity-40 hover:opacity-70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
