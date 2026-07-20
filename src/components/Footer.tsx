"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Leaf,
  Sparkles,
  Send,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

const valueProps = [
  {
    icon: ShieldCheck,
    title: "Clean Formulations",
    body: "100% vegan, organic actives, formulated without parabens or synthetics.",
  },
  {
    icon: Leaf,
    title: "Eco Conscious",
    body: "Responsibility driven, utilizing recycled glass & biodegradable inks.",
  },
  {
    icon: Sparkles,
    title: "Happiness Guarantee",
    body: "Love the formula, or receive a full refund within 30 days of shipment.",
  },
];

export default function Footer() {
  const trackRef = useRef<HTMLDivElement>(null);

  const slide = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-value-card]");
    if (!card) return;
    const gap = 16;
    track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const companyLinks = [
    { name: "About Ziva", href: "/about" },
    { name: "Skincare", href: "/skincare" },
    { name: "Hair Care", href: "/hair-care" },
    { name: "Makeup", href: "/makeup" },
  ];

  const supportLinks = [
    { name: "Contact Support", href: "/contact" },
    { name: "Shipping & Customs", href: "#shipping" },
    { name: "Returns & Exchanges", href: "/returns" },
  ];

  const policyLinks = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Settings", href: "#cookies" },
    { name: "Accessibility", href: "#accessibility" }
  ];

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black font-sans tracking-wide text-white">

      {/* 1. Value Proposition Banner — swipe on mobile, 3-col on md+ */}
      <div className="border-b border-white/10 py-10 sm:py-12">
        <div className="relative mx-auto max-w-8xl md:px-6 lg:px-8">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-6 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {valueProps.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                data-value-card
                className="group flex w-full shrink-0 snap-center flex-col items-center gap-4 text-center md:w-auto md:flex-row md:text-left"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-gold transition-all duration-300 group-hover:-translate-y-1">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white">{title}</h4>
                  <p className="mx-auto max-w-xs text-[11px] font-medium leading-relaxed text-white/55 md:mx-0">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile nav arrows */}
          <div className="mt-5 flex items-center justify-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => slide(-1)}
              aria-label="Previous"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => slide(1)}
              aria-label="Next"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-12">

          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <div className="flex select-none items-center gap-1">
            <Link href="/" className="flex items-center select-none">
              <Image
                src="/ziva_beauty_logo.png"
                alt="ZIVA"
                width={198}
                height={165}
                priority
                className="h-15 w-auto object-contain"
              />
            </Link>
            </div>
            <p className="max-w-xs text-xs font-medium leading-relaxed text-white/55">
              Bright, joyful beauty, skincare, and cosmetics — powered by feel-good botanicals and glow-boosting actives your skin will love.
            </p>
            <div className="mt-2 flex gap-3">
              <a
                href="#"
                className="rounded-2xl bg-white/10 p-2.5 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-ink"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-white">Company</h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs font-medium text-white/55 transition-colors hover:text-gold">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-white">Customer Support</h4>
            <ul className="flex flex-col gap-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs font-medium text-white/55 transition-colors hover:text-gold">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-white">Join The Newsletter</h4>
            <p className="mb-5 text-xs font-medium leading-relaxed text-white/55">
              Sign up for new launches, glow tips, and a 10% off welcome treat.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <div className="flex items-center rounded-full bg-white py-1.5 pl-4 pr-1.5 transition-all focus-within:ring-2 focus-within:ring-gold/40">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full bg-transparent text-xs font-medium text-ink placeholder-stone-400 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="ml-2 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-gold hover:text-ink"
                  aria-label="Join newsletter"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* 3. Footer Bottom */}
      <div className="border-t border-white/10 bg-black py-8">
        <div className="mx-auto flex max-w-8xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center text-xs font-medium text-white/50 md:flex-row md:gap-8 md:text-left">
            <p>© {new Date().getFullYear()} ZIVA Beauty. All rights reserved.</p>
         
          </div>

          <div className="flex items-center gap-3" aria-label="Accepted payment methods">
         

  
            <div className="flex h-10 w-14 items-center justify-center rounded-lg border border-white/15 bg-white px-1.5">
              <Image
                src="/google-pay.svg"
                alt="Google Pay"
                width={40}
                height={40}
                className="h-7 w-auto object-contain"
              />
            </div>

            <div className="flex h-10 w-14 items-center justify-center rounded-lg border border-white/15 bg-white px-1">
              <svg className="h-7 w-full text-ink" viewBox="0 0 50 50" aria-label="Apple Pay">
                <path
                  fill="currentColor"
                  d="M 9.984375 15.001953 C 9.149375 15.041953 8.1182969 15.573313 7.5292969 16.320312 C 6.9892969 16.964312 6.5275313 18.010188 6.6445312 18.992188 C 7.5875313 19.074188 8.5301406 18.500438 9.1191406 17.773438 C 9.6991406 17.026437 10.082375 16.024953 9.984375 15.001953 z M 18 17 L 18 32 L 20.375 32 L 20.375 27 L 23.625 27 C 26.608 27 28.75 24.925 28.75 22 C 28.75 19.075 26.647125 17 23.703125 17 L 18 17 z M 20.375 19 L 23.125 19 C 25.172 19 26.375 20.105 26.375 22 C 26.375 23.895 25.182 25 23.125 25 L 20.375 25 L 20.375 19 z M 9.875 19.5 C 8.5 19.5 7.517 20.25 6.875 20.25 C 6.223 20.25 5.25 19.509766 4.125 19.509766 C 2.75 19.509766 1.4033594 20.372859 0.69335938 21.630859 C -0.76564063 24.145859 0.31460937 27.869016 1.7246094 29.916016 C 2.4156094 30.930016 3.25 32 4.375 32 C 5.406 31.961 5.755 31.375 7 31.375 C 8.254 31.375 8.625 32 9.75 32 C 10.875 32 11.556094 30.969078 12.246094 29.955078 C 13.034094 28.805078 13.356 27.684 13.375 27.625 C 13.356 27.606 11.197734 26.77725 11.177734 24.28125 C 11.158734 22.19525 12.879031 21.200578 12.957031 21.142578 C 11.984031 19.700578 10.375 19.5 10 19.5 L 9.875 19.5 z M 34.199219 21 C 31.710219 21 29.870734 22.395453 29.802734 24.314453 L 31.912109 24.314453 C 32.086109 23.402453 32.948859 22.804688 34.130859 22.804688 C 35.563859 22.804688 36.373047 23.460969 36.373047 24.667969 L 36.375 25.5 L 33.443359 25.654297 C 30.722359 25.815297 29.25 26.908594 29.25 28.808594 C 29.25 30.727594 30.770219 32.001953 32.949219 32.001953 C 34.421219 32.001953 35.78725 31.270328 36.40625 30.111328 L 36.455078 30.111328 L 36.455078 31.886719 L 38.623047 31.886719 L 38.623047 24.515625 C 38.624047 22.376625 36.882219 21 34.199219 21 z M 39.5 21 L 43.507812 31.949219 L 43.292969 32.615234 C 42.930969 33.744234 42.344828 34.177734 41.298828 34.177734 C 41.119828 34.177734 40.781 34.159625 40.625 34.140625 L 40.625 35.945312 C 40.783 35.980313 41.332906 36 41.503906 36 C 43.810906 36 44.896703 35.132047 45.845703 32.498047 L 50 21 L 47.595703 21 L 44.808594 29.884766 L 44.759766 29.884766 L 41.972656 21 L 39.5 21 z M 36.375 27 L 36.367188 27.867188 C 36.367188 29.254188 35.166125 30.242188 33.578125 30.242188 C 32.329125 30.242188 31.535156 29.653953 31.535156 28.751953 C 31.535156 27.820953 32.300672 27.279359 33.763672 27.193359 L 36.375 27 z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
