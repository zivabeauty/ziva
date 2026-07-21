import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Leaf, Droplets, HeartHandshake, Sparkles } from "lucide-react";
import SkincareProductGrid from "@/components/SkincareProductGrid";

export const metadata: Metadata = {
  title: "Skincare Products for Daily Face Care | Ziva Beauty",
  description:
    "Shop skincare products for your daily routine. Explore Ziva Beauty's D-Tan Face Pack and Face Exfoliator for healthy-looking, refreshed skin.",
  alternates: { canonical: "/skincare" },
};

const highlights = [
  { icon: Leaf, title: "Simple & Consistent", sub: "Care that fits your day" },
  { icon: Droplets, title: "Everyday Essentials", sub: "Made for real life" },
  { icon: HeartHandshake, title: "A Habit You'll Enjoy", sub: "Skincare made simple" },
];

export default function SkincarePage() {
  return (
    <div className="bg-white text-ink">
      {/* ── HERO — image only (≈70vh); text lives in the banner artwork ── */}
      <section className="block w-full sm:h-[70vh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/skin_carebanner.png"
          alt="Ziva skincare collection"
          className="h-full w-full object-cover object-center"
        />
      </section>

      {/* ── PRODUCTS — standard storefront cards, right under the hero ── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-12 text-center sm:mb-14">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-deep">
            Our Skincare Collection
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-[-0.02em] text-ink sm:text-4xl">
            Simple products. Thoughtful care.
          </h2>
        </div>

        <SkincareProductGrid />

        <div className="mt-12 flex justify-center">
        
        </div>
      </section>

      {/* ── CONTENT — the copy, below the products ── */}
      <section className="relative overflow-hidden bg-porcelain/40">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(70% 55% at 50% 0%, rgba(226,185,157,0.18), transparent 62%)" }}
        />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-gold-deep ring-1 ring-ink/5 shadow-sm">
            <Leaf className="h-3.5 w-3.5" /> Ziva Skincare
          </span>
          <h2 className="font-serif text-[1.9rem] font-medium leading-[1.14] tracking-[-0.02em] text-ink sm:text-[2.5rem]">
            Skincare Products for Everyday{" "}
            <span className="italic text-gold-deep">Healthy-Looking</span> Skin
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[17px] font-medium text-ink/80">
            Healthy skin starts with simple, consistent care.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] font-light leading-relaxed text-ink/60">
            Our skincare collection is made for everyday life. Whether you&apos;re building your first
            routine or keeping an existing one simple, these essentials fit naturally into your day
            and help make skincare a habit you&apos;ll enjoy.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[15px] font-light leading-relaxed text-ink/60">
            Browse the collection and find the products that work best for your routine.
          </p>

          {/* highlight chips */}
          <div className="mx-auto mt-11 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, title, sub }) => (
              <div
                key={title}
                className="flex flex-col items-center gap-2 rounded-2xl border border-ink/5 bg-white px-4 py-5 shadow-[0_6px_20px_rgba(61,36,18,0.05)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft text-gold-deep">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink">{title}</p>
                <p className="text-[11px] font-light text-ink/50">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING BAND ── */}
      <section className="relative overflow-hidden bg-ink py-20 sm:py-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(226,185,157,0.16), transparent 60%)" }}
        />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <Sparkles className="mx-auto mb-5 h-6 w-6 text-gold" />
          <h2 className="font-serif text-3xl font-medium text-cream sm:text-4xl">
            Everyday Skincare, Made Simple
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] font-light leading-relaxed text-cream/70">
            A consistent routine doesn&apos;t have to be complicated. Choose the products that fit
            your lifestyle and enjoy skincare that feels simple, comfortable, and made for every day.
          </p>
        
        </div>
      </section>
    </div>
  );
}
