"use client";

import Link from "next/link";
import { Sparkles, Droplet, Gem, ArrowRight } from "lucide-react";

/** Pure-CSS gold glass orb — lightweight centerpiece (no WebGL / three.js). */
function OrbFallback({ pulse = false }: { pulse?: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className={`relative h-56 w-56 sm:h-72 sm:w-72 rounded-full ${pulse ? "animate-luxe-float" : ""}`}
        style={{
          background:
            "radial-gradient(35% 35% at 35% 30%, rgba(255,255,255,0.9), rgba(232,217,176,0.5) 40%, rgba(201,169,97,0.35) 60%, rgba(10,10,10,0.1) 100%)",
          boxShadow:
            "0 0 90px 10px rgba(201,169,97,0.25), inset -20px -24px 60px rgba(90,71,21,0.35), inset 18px 20px 50px rgba(255,247,230,0.55)",
        }}
      >
        <div
          className="absolute left-[26%] top-[20%] h-10 w-10 rounded-full blur-[2px]"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.95), transparent 70%)" }}
        />
      </div>
    </div>
  );
}

export default function SerumShowcase() {
  const highlights = [
    { icon: Gem, label: "24K Gold Complex", sub: "Visible luminosity" },
    { icon: Droplet, label: "Hyaluronic Depth", sub: "72-hour hydration" },
    { icon: Sparkles, label: "Bio-Active Botanicals", sub: "Clinically refined" },
  ];

  return (
    <section className="ink-surface grain relative overflow-hidden">
      {/* soft gold vignettes */}
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-gold/[0.07] blur-[110px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Copy */}
        <div className="order-2 lg:order-1 text-cream">
          <span className="eyebrow mb-6">The Formula In Motion</span>
          <h2 className="display-xl text-4xl sm:text-5xl lg:text-6xl text-cream mb-6">
            Liquid Gold,
            <br />
            <span className="candy-gradient-text on-dark">Bottled</span>
          </h2>
          <p className="text-cream/65 text-sm sm:text-base font-light leading-relaxed max-w-md mb-10">
            Every Ziva serum is a suspension of light — gold-standard actives held
            in a weightless, fast-absorbing veil. Turn it over and watch the formula
            catch the light, the way it will on your skin.
          </p>

          <div className="flex flex-col divide-y divide-white/10 border-y border-white/10 mb-10">
            {highlights.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-4 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[13px] font-semibold tracking-wide text-cream">{label}</p>
                  <p className="text-[11px] text-cream/45 font-light">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="#shop" className="btn-luxe">
            <span>Explore The Serums</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Orb stage */}
        <div className="order-1 lg:order-2 relative">
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            {/* glow plate behind the object */}
            <div
              className="pointer-events-none absolute inset-8 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(201,169,97,0.16), transparent 62%)" }}
            />
            <OrbFallback pulse />

            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-panel-dark px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] text-gold">
              L&apos;Or de Ziva · Nourishing Elixir
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
