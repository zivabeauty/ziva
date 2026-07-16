"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Star,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Award,
  Truck,
  Leaf,
  Lock,
  Gem,
  X,
  Droplets,
  Sun,
  Moon,
  Flame,
  Zap,
  Shield,
  RefreshCw,
} from "lucide-react";

import Hero from "@/components/Hero";
import SerumShowcase from "@/components/SerumShowcase";
import BeforeAfter from "@/components/BeforeAfter";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoryCard from "@/components/CategoryCard";
import CtaBanner from "@/components/CtaBanner";
import SectionHeading from "@/components/ui/SectionHeading";

import { useProducts } from "@/lib/useProducts";
import { addToCart } from "@/lib/product-utils";
import { useCategories } from "@/features/categories/hooks/useCategories";
import {
  categories as staticCategories,
  skinConcerns,
  testimonials,
  instagramImages,
  ingredientsData,
  type Product,
} from "@/data/beautyData";

/** Resolves category tile links — supports legacy hash anchors and new page routes. */
const categoryHref = (href?: string) => {
  if (!href) return "/skincare";
  if (href.startsWith("/")) return href;
  if (href === "#makeup") return "/makeup";
  if (href === "#haircare") return "/hair-care";
  return "/skincare";
};

export default function Home() {
  const { products } = useProducts();
  const { data: categories = staticCategories } = useCategories();

  const [galleryImage, setGalleryImage] = useState<string | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activeConcern, setActiveConcern] = useState("Dry Skin");

  // Interactive quiz
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState({ skinType: "", concern: "", finish: "" });
  const [recommended, setRecommended] = useState<Product[]>([]);

  const handleQuizAnswer = (key: string, value: string) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (key === "finish") {
      let recs: Product[] = [];
      if (next.concern === "Hair Repair") recs = products.filter((p) => p.id === 12 || p.id === 13);
      else if (next.concern === "Anti Aging") recs = products.filter((p) => p.id === 2 || p.id === 3);
      else if (next.concern === "Acne") recs = products.filter((p) => p.id === 4 || p.id === 5);
      else if (next.concern === "Hydration" || next.skinType === "Dry")
        recs = products.filter((p) => p.id === 1 || p.id === 3);
      else if (next.concern === "Brightening") recs = products.filter((p) => p.id === 1 || p.id === 2);
      else recs = products.filter((p) => p.id === 3 || p.id === 7);
      setRecommended(recs);
      setQuizStep(4);
    } else {
      setQuizStep((s) => s + 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({ skinType: "", concern: "", finish: "" });
    setRecommended([]);
    setQuizStep(0);
  };

  // Testimonial autoplay
  useEffect(() => {
    const t = setInterval(() => setTestimonialIndex((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

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

  const concernIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    Acne: Flame,
    "Dry Skin": Droplets,
    "Oily Skin": Sun,
    Pigmentation: Moon,
    Brightening: Sparkles,
    "Anti Aging": RefreshCw,
    "Sensitive Skin": Shield,
    Hydration: Zap,
    "Sun Tan": Sun,
    "Dull Skin": Sparkles,
  };

  const whyChooseUs = [
    { Icon: ShieldCheck, label: "Dermatologist Tested", sub: "Clinically approved formulas" },
    { Icon: Leaf, label: "Natural Ingredients", sub: "Botanically active, clean beauty" },
    { Icon: Heart, label: "Cruelty Free", sub: "Never tested on animals" },
    { Icon: Truck, label: "Fast Delivery", sub: "Free shipping on all orders" },
    { Icon: Lock, label: "Secure Payment", sub: "100% protected checkout" },
    { Icon: Gem, label: "Premium Quality", sub: "Gold-standard actives" },
  ];

  return (
    <div className="relative min-h-screen font-sans text-ink">
      {/* SECTION 1 — HERO */}
      <Hero />

      {/* SECTION 2 — SHOP BY CATEGORY */}
      <section className="fade-in-section mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          index="01"
          eyebrow="Explore The Maison"
          title={
            <>
              Shop By <span className="candy-gradient-text">Category</span>
            </>
          }
          className="mb-16"
        />
        <div className="reveal-stagger grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.name}
              name={cat.name}
              count={cat.count}
              image={cat.image}
              href={categoryHref(cat.href)}
            />
          ))}
        </div>
      </section>

      {/* SECTION 3 — PROMO BANNER */}
      <section className="fade-in-section mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <CtaBanner
          eyebrow="Glow Every Day"
          title={
            <>
              Skincare That <br />
              <span className="candy-gradient-text">Loves</span> You Back
            </>
          }
          description="Enjoy 20% off our most-loved rituals — a limited invitation to the Ziva standard of glow."
          ctaLabel="Shop The Edit"
          ctaHref="/products"
          image="/Bridal bright facial kit/thumbnail.png"
          imageAlt="Ziva bestseller"
        />
      </section>

      {/* SECTION 4 — FEATURED PRODUCTS */}
      <FeaturedProducts />
      

      {/* SECTION 5 — EDITORIAL / MAGAZINE */}
      <section className="fade-in-section bg-porcelain/45 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="group relative flex flex-1 flex-col justify-between overflow-hidden rounded-[28px] bg-porcelain p-7 transition-shadow hover:shadow-xl">
              <div>
                <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                  Bridal Glow
                </span>
                <h3 className="mb-3 font-serif text-2xl text-ink">
                  Bridal Bright <span className="candy-gradient-text">Facial Kit</span>
                </h3>
                <p className="text-sm font-medium leading-relaxed text-ink/60">
                  Enriched with 24K gold particles, saffron, and pearl extracts for a radiant,
                  camera-ready bridal glow that lights up every photo.
                </p>
              </div>
              <Link
                href="/products?category=Skincare"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:text-gold-deep"
              >
                Discover Kit <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="group relative flex flex-1 flex-col justify-between overflow-hidden rounded-[28px] bg-gold-soft p-7 transition-shadow hover:shadow-xl">
              <div>
                <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                  K-Beauty Secret
                </span>
                <h3 className="mb-3 font-serif text-2xl text-ink">
                  Korean Glass <span className="candy-gradient-text">Glow</span>
                </h3>
                <p className="text-sm font-medium leading-relaxed text-ink/60">
                  Our 7-step professional facial kit infused with rice water, niacinamide, and
                  hyaluronic acid for the coveted Korean glass-skin finish.
                </p>
              </div>
              <Link
                href="/products?category=Skincare"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:text-gold-deep"
              >
                Discover K-Beauty <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="group relative min-h-[460px] overflow-hidden rounded-[32px] lg:col-span-7">
            <img
              src="/Bridal bright facial kit/3.png"
              alt="Ziva Bridal Beauty"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/60 bg-white/85 p-6 shadow-2xl backdrop-blur-xl sm:right-auto sm:max-w-[280px]">
              <span className="mb-1.5 block text-[8px] font-bold uppercase tracking-[0.3em] text-gold-deep">
                Ziva Beauty
              </span>
              <h4 className="mb-2 font-serif text-sm font-bold uppercase tracking-wide text-ink">
                The Ziva Standard
              </h4>
              <p className="text-[11px] font-medium leading-relaxed text-ink/60">
                &ldquo;Every product is crafted with premium ingredients and tested rigorously for
                real, visible results.&rdquo;
              </p>
              <div className="mt-4 h-[3px] w-8 rounded-full bg-gold" />
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* SECTION 6 — SHOP BY CONCERN */}
      <section className="fade-in-section bg-porcelain/60 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            index="03"
            eyebrow="Targeted Care"
            title={
              <>
                Shop by <span className="candy-gradient-text">Concern</span>
              </>
            }
            className="mb-14"
          />
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {skinConcerns.map((c, i) => {
              const Icon = concernIcons[c.name] || Sparkles;
              const active = activeConcern === c.name;
              return (
                <button
                  key={i}
                  onClick={() => setActiveConcern(c.name)}
                  className={`flex cursor-pointer flex-col items-center gap-3 rounded-3xl p-6 text-center transition-all duration-300 ${
                    active
                      ? "scale-[1.03] bg-ink text-cream shadow-xl"
                      : "bg-white text-ink hover:-translate-y-1 hover:shadow-lg"
                  }`}
                >
                  <div className={`rounded-2xl p-3 ${active ? "bg-white/15" : "bg-porcelain"}`}>
                    <Icon className={`h-6 w-6 ${active ? "text-gold" : "text-gold-deep"}`} />
                  </div>
                  <span className="text-sm font-bold tracking-wide">{c.name}</span>
                  <span
                    className={`text-xs font-medium tracking-wider ${active ? "text-cream/70" : "text-stone-400"}`}
                  >
                    {c.tag}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-14 grid grid-cols-1 items-center gap-10 rounded-[32px] bg-white p-8 shadow-[0_12px_40px_rgba(201,169,97,0.08)] sm:p-10 lg:grid-cols-2">
            <div>
              <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-gold-deep">
                Targeted Formula
              </span>
              <h3 className="mb-4 font-serif text-2xl text-ink sm:text-3xl">
                Care for <span className="candy-gradient-text">{activeConcern}</span>
              </h3>
              <p className="mb-5 text-sm font-medium leading-relaxed text-ink/60">
                Restore balance and boost radiance with our botanically active formulas, refined to
                target {activeConcern.toLowerCase()} for visibly healthier skin.
              </p>
              <Link
                href={`/products?q=${encodeURIComponent(activeConcern)}`}
                className="inline-flex w-fit rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-gold hover:text-ink"
              >
                Explore Regime
              </Link>
            </div>
            <div className="flex flex-wrap gap-5">
              {products.slice(0, 2).map((p) => (
                <div
                  key={p.id}
                  className="flex min-w-[220px] flex-1 items-center gap-4 rounded-3xl bg-cream p-4 transition-shadow hover:shadow-md"
                >
                  <img src={p.image} alt={p.name} loading="lazy" className="h-18 w-18 rounded-2xl object-cover" />
                  <div className="flex flex-col gap-1">
                    <span className="line-clamp-1 text-sm font-bold text-ink">{p.name}</span>
                    <span className="text-sm font-extrabold">{p.price}</span>
                    <button
                      onClick={() => addToCart(p, p.sizes?.[0] || "Standard")}
                      className="mt-1 cursor-pointer text-left text-xs font-bold tracking-wider text-gold-deep hover:text-ink"
                    >
                      + Add to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — 3D SERUM SHOWCASE */}
     1

      {/* SECTION 8 — FEATURED INGREDIENTS */}
      <section className="fade-in-section ink-surface grain">
        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          tone="dark"
          eyebrow="Clean & Effective"
          title={
            <>
              Featured <span className="candy-gradient-text">Ingredients</span>
            </>
          }
          className="mb-14"
        />
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {ingredientsData.map((ing, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-[28px] bg-white shadow-[0_6px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(201,169,97,0.14)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                <img
                  src={ing.image}
                  alt={ing.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 font-serif text-lg font-bold text-ink">{ing.name}</h3>
                <p className="mb-5 text-sm font-medium leading-relaxed text-ink/60">{ing.benefits}</p>
                <div className="flex flex-col gap-2 border-t border-stone-100 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    Recommended for
                  </span>
                  {ing.recommendedProducts.map((p, j) => (
                    <span key={j} className="flex items-center gap-2 text-xs font-bold text-ink/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* SECTION 9 — BEFORE / AFTER */}
      <section className="fade-in-section mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <span className="w-fit rounded-full bg-porcelain px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-gold-deep">
              Real Results
            </span>
            <h2 className="font-serif text-2xl text-ink sm:text-4xl">
              14-Day Glow <span className="candy-gradient-text">Transformation</span>
            </h2>
            <div className="h-[3px] w-12 rounded-full bg-gold" />
            <p className="text-sm font-medium leading-relaxed text-ink/60">
              Drag the slider to see real results from our Korean Glass Glow Facial Kit — used weekly
              for two weeks.
            </p>
            <div className="mt-1 flex flex-col gap-3 border-t border-stone-100 pt-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider">Glow Increase</span>
                <span className="text-sm font-extrabold text-gold-deep">+84%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider">Dark Spots Reduced</span>
                <span className="text-sm font-extrabold text-gold-deep">-32%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:col-span-7">
            <BeforeAfter
              beforeImage="/Korean Glass glow Facial kit/5.png"
              afterImage="/Korean Glass glow Facial kit/6.png"
            />
          </div>
        </div>
      </section>

      {/* SECTION 10 — SKIN DIAGNOSTIC QUIZ */}
      <section className="border-t border-stone-100 bg-white py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            index="05"
            eyebrow="Interactive Quiz"
            title={
              <>
                Find Your Perfect Ziva <span className="candy-gradient-text">Ritual</span>
              </>
            }
            subtitle="Answer three simple questions about your concerns and texture preferences to build your personalized skin and hair regime."
            className="mb-12"
          />

          <div className="relative overflow-hidden rounded-[36px] bg-porcelain p-8 shadow-[0_12px_40px_rgba(201,169,97,0.1)] sm:p-12">
            {quizStep === 0 && (
              <div className="flex flex-col items-center gap-6 py-8 text-center">
                <Sparkles className="h-10 w-10 text-gold" />
                <h3 className="font-serif text-xl text-ink sm:text-2xl">Start the Ziva Skin Concierge</h3>
                <p className="max-w-sm text-sm font-medium leading-relaxed text-ink/60">
                  Let our smart matching quiz map your concerns to the perfect botanical formulas for
                  you.
                </p>
                <button
                  onClick={() => setQuizStep(1)}
                  className="cursor-pointer rounded-full bg-ink px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-gold hover:text-ink"
                >
                  Begin Quiz
                </button>
              </div>
            )}

            {quizStep === 1 && (
              <div>
                <div className="mb-6 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                  <span>Question 1 of 3</span>
                  <span className="text-gold-deep">Skin / Hair Type</span>
                </div>
                <h3 className="mb-8 text-center font-serif text-lg text-ink">
                  How would you describe your primary profile?
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Dry & Dehydrated", val: "Dry" },
                    { label: "Oily & Acne-Prone", val: "Oily" },
                    { label: "Normal / Balanced", val: "Normal" },
                    { label: "Sensitive & Fragile", val: "Sensitive" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => handleQuizAnswer("skinType", opt.val)}
                      className="cursor-pointer rounded-2xl bg-white p-5 text-center text-xs font-bold text-ink transition-all hover:-translate-y-1 hover:bg-gold hover:text-ink hover:shadow-lg"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 2 && (
              <div>
                <div className="mb-6 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                  <span>Question 2 of 3</span>
                  <span className="text-gold-deep">Target Concern</span>
                </div>
                <h3 className="mb-8 text-center font-serif text-lg text-ink">
                  What is the single biggest result you want to achieve?
                </h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {[
                    { label: "Instant Brightening", val: "Brightening" },
                    { label: "Deep Hydration", val: "Hydration" },
                    { label: "Acne & Tan Control", val: "Acne" },
                    { label: "Wrinkles & Aging", val: "Anti Aging" },
                    { label: "Hair Repair", val: "Hair Repair" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => handleQuizAnswer("concern", opt.val)}
                      className="cursor-pointer rounded-2xl bg-white p-5 text-center text-xs font-bold text-ink transition-all hover:-translate-y-1 hover:bg-gold hover:text-ink hover:shadow-lg"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 3 && (
              <div>
                <div className="mb-6 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                  <span>Question 3 of 3</span>
                  <span className="text-gold-deep">Desired Finish</span>
                </div>
                <h3 className="mb-8 text-center font-serif text-lg text-ink">
                  What finish do you prefer for your skincare &amp; makeup?
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Luminous, Dewy & Glass-like", val: "Dewy" },
                    { label: "Velvet Matte & Poreless", val: "Matte" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => handleQuizAnswer("finish", opt.val)}
                      className="cursor-pointer rounded-2xl bg-white p-5 text-center text-xs font-bold text-ink transition-all hover:-translate-y-1 hover:bg-gold hover:text-ink hover:shadow-lg"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 4 && (
              <div className="flex flex-col items-center py-4 text-center">
                <Sparkles className="mb-3 h-8 w-8 text-gold" />
                <span className="mb-1 text-[9px] font-bold uppercase tracking-[0.25em] text-stone-400">
                  Your Quiz Results
                </span>
                <h3 className="mb-6 font-serif text-2xl text-ink sm:text-3xl">Your Perfect Ziva Ritual</h3>

                <div className="mb-8 flex w-full max-w-xl flex-col justify-center gap-6 sm:flex-row">
                  {recommended.map((p) => (
                    <div
                      key={p.id}
                      className="group relative flex flex-1 flex-col items-center gap-3 rounded-3xl bg-white p-4 shadow-md"
                    >
                      <div className="h-24 w-24 overflow-hidden rounded-full bg-porcelain">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="text-center">
                        <span className="text-[8px] font-bold uppercase tracking-wider text-gold-deep">
                          {p.category}
                        </span>
                        <h4 className="mt-0.5 line-clamp-1 text-xs font-bold text-ink">{p.name}</h4>
                        <p className="mt-1 text-xs font-extrabold text-ink">{p.price}</p>
                      </div>
                      <button
                        onClick={() => addToCart(p, p.sizes?.[0] || "Standard")}
                        className="mt-2 w-full cursor-pointer rounded-full bg-ink py-2 text-[9px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-gold hover:text-ink"
                      >
                        + Add To Bag
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={resetQuiz}
                    className="cursor-pointer rounded-full bg-white px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-ink/60 shadow-sm transition-all hover:text-ink"
                  >
                    Retake Quiz
                  </button>
                  <Link
                    href="/products"
                    className="rounded-full bg-ink px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-gold hover:text-ink"
                  >
                    Explore All
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 11 — CUSTOMER STORIES */}
      <section className="fade-in-section bg-gold-soft/40 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionHeading
            index="06"
            eyebrow="Happy Customers"
            title={
              <>
                Customer <span className="candy-gradient-text">Stories</span>
              </>
            }
            className="mb-12"
          />
          <div className="relative flex min-h-[200px] items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="absolute flex flex-col items-center gap-5"
              >
                <div className="flex gap-0.5">
                  {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="max-w-xl font-serif text-lg leading-relaxed text-ink sm:text-xl">
                  &ldquo; {testimonials[testimonialIndex].quote} &rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonials[testimonialIndex].avatar}
                    alt={testimonials[testimonialIndex].author}
                    className="h-11 w-11 rounded-full border-2 border-gold object-cover"
                  />
                  <div className="text-left">
                    <span className="block text-xs font-bold text-ink">
                      {testimonials[testimonialIndex].author}
                    </span>
                    <span className="text-[10px] font-medium text-stone-500">
                      {testimonials[testimonialIndex].role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === testimonialIndex ? "w-6 bg-gold" : "w-2 bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12 — INSTAGRAM FEED */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          index="07"
          eyebrow="@zivabeauty"
          title={
            <>
              Follow Our <span className="candy-gradient-text">Journey</span>
            </>
          }
          className="mb-12"
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {instagramImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setGalleryImage(img)}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-3xl"
            >
              <img
                src={img}
                alt="Instagram"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-ink/50 opacity-0 transition-opacity group-hover:opacity-100">
                <svg
                  className="h-6 w-6 text-cream"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-ink px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Follow Us <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* SECTION 13 — WHY CHOOSE US */}
      <section className="fade-in-section border-y border-stone-200/70 bg-porcelain/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            index="08"
            eyebrow="The Ziva Promise"
            title={
              <>
                Why Choose <span className="candy-gradient-text">Ziva</span>
              </>
            }
            className="mb-14"
          />
          {/* Editorial "promise ledger" — hairline-divided grid with serif index numerals */}
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[28px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map(({ Icon, label, sub }, i) => (
              <div
                key={label}
                className="group flex items-start gap-4 bg-cream p-6 transition-colors duration-300 hover:bg-porcelain sm:p-8"
              >
                <span className="font-serif text-3xl italic leading-none text-gold-deep/35 transition-colors duration-300 group-hover:text-gold-deep/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2 pt-0.5">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0 text-gold-deep" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
                      {label}
                    </p>
                  </div>
                  <p className="text-xs font-light leading-relaxed text-stone-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14 — NEWSLETTER */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative flex flex-col items-center gap-5 overflow-hidden rounded-[32px] bg-ink p-8 text-center sm:p-16">
          <div className="pointer-events-none absolute -right-10 -top-16 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(226,185,157,0.14), transparent 70%)" }} />
          <div className="pointer-events-none absolute bottom-[-60px] left-1/4 h-64 w-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(226,185,157,0.09), transparent 70%)" }} />
          <span className="relative z-10 rounded-full border border-gold/30 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.35em] text-gold">
            The Inner Circle
          </span>
          <h2 className="relative z-10 font-serif text-3xl text-cream sm:text-4xl">
            Join The Ziva Circle
          </h2>
          <p className="relative z-10 max-w-sm text-sm font-light leading-relaxed text-cream/70">
            Enjoy first access to new launches, private sales, and expert rituals — plus 10% off your
            first order.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative z-10 mt-3 flex w-full max-w-md flex-col gap-2.5 sm:flex-row"
          >
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              required
              className="flex-grow rounded-full bg-cream px-5 py-3.5 text-sm font-medium text-ink placeholder-stone-400 transition-all focus:outline-none focus:ring-2 focus:ring-gold/60"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-gold px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-cream"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Instagram lightbox */}
      <AnimatePresence>
        {galleryImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              onClick={() => setGalleryImage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 aspect-square w-full max-w-xl overflow-hidden rounded-2xl"
            >
              <img src={galleryImage} alt="Instagram" className="h-full w-full object-cover" />
              <button
                onClick={() => setGalleryImage(null)}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white hover:text-gold"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
