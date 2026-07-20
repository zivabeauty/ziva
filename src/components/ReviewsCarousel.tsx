"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/beautyData";

/** Dot & Key–style reviews carousel: 3 cards + peek of next. */
export default function ReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const slide = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-review-card]");
    if (!card) return;
    const gap = 20;
    track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="bg-white py-14 sm:py-12 border-t border-black/10">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-[26px] font-bold text-black sm:mb-14 sm:text-[32px]">
          Love That Keeps Us Going
        </h2>

        <div className="relative">
          <button
            type="button"
            onClick={() => slide(-1)}
            aria-label="Previous reviews"
            className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-black shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition-colors hover:bg-stone-50 sm:h-11 sm:w-11"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => slide(1)}
            aria-label="Next reviews"
            className="absolute right-0 top-1/2 z-20 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-black shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition-colors hover:bg-stone-50 sm:h-11 sm:w-11"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto scroll-smooth pt-7 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((review) => (
              <article
                key={review.id}
                data-review-card
                className="relative w-[78%] shrink-0 sm:w-[46%] lg:w-[31.5%]"
              >
                <div className="relative flex h-full min-h-[340px] flex-col rounded-[28px] border border-stone-100 bg-white px-6 pb-6 pt-8 shadow-[0_2px_16px_rgba(0,0,0,0.05)] sm:min-h-[360px] sm:px-7 sm:pb-7 sm:pt-9">
                  <div className="mb-4 flex items-start gap-3">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="absolute -left-2 -top-5 h-[56px] w-[56px] rounded-full object-cover shadow-sm ring-[3px] ring-white sm:-left-3 sm:-top-6 sm:h-[64px] sm:w-[64px]"
                    />
                    <div className="flex min-w-0 items-center gap-1.5 pl-[52px] sm:pl-[58px]">
                      <h3 className="truncate text-[12px] font-bold uppercase tracking-[0.03em] text-black sm:text-[13px]">
                        {review.author}
                      </h3>
                      <span
                        className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#2B87FF]"
                        aria-label="Verified"
                      >
                        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" aria-hidden>
                          <path
                            d="M2.5 6.2L4.8 8.5L9.5 3.5"
                            stroke="#fff"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-3 flex gap-0.5" aria-label="5 star rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
                        <path
                          fill="#7EB014"
                          d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.27 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z"
                        />
                      </svg>
                    ))}
                  </div>

                  <h4 className="mb-2 text-[16px] font-bold leading-snug text-black sm:text-[17px]">
                    {review.title}
                  </h4>
                  <p className="mb-6 flex-1 text-[13px] leading-[1.65] text-[#555] sm:text-[14px]">
                    {review.quote}
                  </p>

                  <div className="mt-auto flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gold-soft sm:h-14 sm:w-14">
                      <img
                        src={review.productImage}
                        alt={review.productName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] leading-snug text-black sm:text-[12px]">
                        {review.author.split(" ")[0]} Recommends This Product
                      </p>
                      <Link
                        href={review.productHref}
                        className="mt-0.5 inline-block text-[12px] font-bold uppercase tracking-wide text-gold-deep hover:opacity-80 sm:text-[13px]"
                      >
                        Shop Now &gt;&gt;
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
