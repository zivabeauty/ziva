"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aboutContent } from "@/data/pageContent";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBanner from "@/components/CtaBanner";
import Magnetic from "@/components/Magnetic";

export default function AboutPage() {
  const { eyebrow, title, titleAccent, heroImage, intro, story, values, stats } = aboutContent;

  // Scroll-reveal
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-in-section, .reveal-stagger");
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-ink">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-stone-150 bg-porcelain/60">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div className="text-center lg:text-left">
            <span className="eyebrow mb-4">{eyebrow}</span>
            <h1 className="display-xl text-4xl text-ink sm:text-6xl">
              {title}{" "}
              <span className="candy-gradient-text">{titleAccent}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-sm font-light leading-relaxed text-stone-500 lg:mx-0">
              {intro}
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <Magnetic>
                <Link href="/products" className="btn-luxe">
                  <span>Explore Collections</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Magnetic>
            </div>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(10,10,10,0.12)] lg:max-w-none">
            <img src={heroImage} alt="Ziva Beauty" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="border-b border-stone-100 bg-white py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl font-bold text-ink sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="fade-in-section mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Journey"
          title={
            <>
              The Ziva <span className="candy-gradient-text">Story</span>
            </>
          }
          className="mb-16"
        />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {story.map((block, i) => (
            <div key={block.title} className="relative">
              <span className="text-[10px] font-bold tracking-[0.3em] text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-xl font-bold text-ink">{block.title}</h3>
              <p className="mt-4 text-sm font-medium leading-relaxed text-ink/60">{block.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-stone-100 bg-porcelain/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Stand For"
            title={
              <>
                Our Core <span className="candy-gradient-text">Values</span>
              </>
            }
            className="mb-14"
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="card-luxe rounded-[4px] p-6 text-center transition-transform duration-300 hover:-translate-y-1 lg:text-left"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-gold lg:mx-0">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink">{v.title}</h3>
                <p className="mt-3 text-xs font-medium leading-relaxed text-ink/55">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <CtaBanner
          eyebrow="Experience Ziva"
          title={
            <>
              Begin Your <span className="candy-gradient-text">Ritual</span>
            </>
          }
          description="From glass-skin facials to editorial makeup — discover formulas crafted for visible, lasting radiance."
          ctaLabel="Shop All Products"
          ctaHref="/products"
          image="/Bridal bright facial kit/thumbnail.png"
          imageAlt="Ziva collections"
        />
      </section>
    </div>
  );
}
