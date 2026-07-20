import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Leaf, Palette, HeartHandshake } from "lucide-react";
import CategoryProductGrid from "@/components/CategoryProductGrid";

export const metadata: Metadata = {
  title: "Makeup Products for Every Look | Ziva Beauty",
  description:
    "Shop makeup products online at Ziva Beauty. Explore Makeup Primer, Liquid Foundation, Waterproof Mascara, Eyeliner, Korean Glow Kit, and Bridal Glow Kit.",
  alternates: { canonical: "/makeup" },
};

const HERO_IMAGE = "/makeup_hero.png";

const highlights = [
  { icon: Palette, title: "Every Look", sub: "Natural to occasion-ready" },
  { icon: Leaf, title: "Simple & Enjoyable", sub: "Easy to wear every day" },
  { icon: HeartHandshake, title: "Made for You", sub: "Comfortable & confident" },
];

const faqs = [
  {
    q: "Are Ziva Beauty makeup products suitable for beginners?",
    a: "Yes. Our makeup collection is easy to use, making it suitable for both beginners and experienced makeup users.",
  },
  {
    q: "Can I use these makeup products every day?",
    a: "Yes. Our makeup essentials are suitable for everyday wear and fit naturally into your beauty routine.",
  },
  {
    q: "How do I choose the right Liquid Foundation shade?",
    a: "Choose the shade that most closely matches your natural skin tone for a seamless, natural-looking finish.",
  },
  {
    q: "Can I use the Makeup Primer with the Liquid Foundation?",
    a: "Yes. Apply the Makeup Primer before your Liquid Foundation to create a smooth base for makeup application.",
  },
  {
    q: "What products are included in the Ziva Beauty Makeup Collection?",
    a: "Our collection includes a Makeup Primer, Liquid Foundation, Waterproof Mascara, Eyeliner, Korean Glow Kit, and Bridal Glow Kit.",
  },
];

export default function MakeupPage() {
  return (
    <div className="bg-white text-ink">
      {/* ── HERO — same sizing treatment as home Hero ── */}
      <section className="relative w-full bg-porcelain">
        <Link
          href="/products?category=Makeup"
          aria-label="Shop Ziva Makeup"
          className="block w-full overflow-hidden sm:h-[70vh]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE}
            alt="Welcome to Ziva Beauty — Where Beauty Meets Care"
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-12 text-center sm:mb-14">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-deep">
            Our Makeup Collection
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-[-0.02em] text-ink sm:text-4xl">
            Simple products. Beautiful results.
          </h2>
        </div>

        <CategoryProductGrid category="Makeup" />
      </section>

      {/* ── CONTENT ── */}
      <section className="relative overflow-hidden bg-porcelain/40">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 0%, rgba(226,185,157,0.18), transparent 62%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-gold-deep ring-1 ring-ink/5 shadow-sm">
            <Palette className="h-3.5 w-3.5" /> Ziva Makeup
          </span>
          <h2 className="font-serif text-[1.9rem] font-medium leading-[1.14] tracking-[-0.02em] text-ink sm:text-[2.5rem]">
            Makeup Products for Every{" "}
            <span className="italic text-gold-deep">Look</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[17px] font-medium text-ink/80">
            Makeup is about feeling like yourself, whether you&apos;re keeping it natural or getting
            ready for a special occasion.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] font-light leading-relaxed text-ink/60">
            At Ziva Beauty, we believe makeup should feel simple, enjoyable, and easy to wear. From
            everyday essentials to occasion-ready favourites, our collection helps you create looks
            that feel comfortable, confident, and uniquely yours.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] font-light leading-relaxed text-ink/60">
            Suitable for everyone, our makeup products fit naturally into your beauty routine,
            making it easy to create looks you&apos;ll love wearing.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[15px] font-light leading-relaxed text-ink/60">
            Browse the collection and find the products that suit your style.
          </p>

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

      {/* ── FAQ ── */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-deep">
            FAQ
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-[-0.02em] text-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="divide-y divide-ink/10 border-t border-ink/10">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-[15px] font-medium tracking-tight text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span className="text-ink/30 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-ink/55">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CLOSING BAND ── */}
      <section className="relative overflow-hidden bg-ink py-20 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(226,185,157,0.16), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <Sparkles className="mx-auto mb-5 h-6 w-6 text-gold" />
          <h2 className="font-serif text-3xl font-medium text-cream sm:text-4xl">
            Makeup Made Simple
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] font-light leading-relaxed text-cream/70">
            A great makeup routine doesn&apos;t have to be complicated. A few well-chosen products
            can help you create looks that feel natural, polished, and effortless.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[15px] font-light leading-relaxed text-cream/70">
            Whether you&apos;re building your first makeup kit or refreshing your collection, Ziva
            Beauty&apos;s makeup products are made to fit naturally into your everyday beauty
            routine.
          </p>
        </div>
      </section>
    </div>
  );
}
