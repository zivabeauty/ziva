import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Ziva Beauty | Everyday Skincare, Makeup & Hair Care",
  description:
    "Beauty has always been part of everyday life in India. Discover why we created Ziva Beauty — products that fit real life, without overthinking.",
  alternates: { canonical: "/about" },
};

const madeFor = [
  "Women",
  "Men",
  "First-timers",
  "Routine lovers",
  "Busy mornings",
  "Slow Sundays",
  "Wedding mornings",
  "Ordinary Tuesdays",
];

const findHere = [
  {
    title: "Skincare",
    body: "Products that help you refresh after a long day.",
  },
  {
    title: "Makeup",
    body: "Looks that feel comfortable enough to wear every day.",
  },
  {
    title: "Hair Care",
    body: "Rituals you'll actually make time for.",
  },
  {
    title: "Beauty Kits",
    body: "Everything together when you need it most.",
  },
];

const matters = [
  "The ones you reach for without thinking",
  "The ones you finish",
  "The ones you recommend",
  "The ones you miss when they're gone",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      {/* Hero — text only, no image (original) */}
      <header className="border-b border-stone-100 bg-porcelain/40">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-deep">
            Our Story
          </p>
          <h1 className="font-serif text-4xl font-medium tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.25rem]">
            About <span className="italic text-gold-deep">Ziva Beauty</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[17px] font-medium leading-relaxed text-ink/75">
            Beauty has always been part of everyday life in India.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] font-light leading-relaxed text-ink/60">
            Long before skincare became a trend, many of us grew up with homemade face packs,
            weekend hair oiling, and getting ready together before weddings, festivals, and family
            celebrations.
          </p>
        </div>
      </header>

      {/* Today — split */}
      <section className="border-b border-ink/8 bg-porcelain/50">
        <div className="mx-auto grid max-w-8xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/40">
              01 — Today
            </p>
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
              Life looks a little different.
            </h2>
          </div>
          <div className="space-y-5 lg:col-span-8 lg:max-w-2xl">
            <p className="text-[15px] font-light leading-[1.8] text-ink/65 sm:text-base">
              Between busy schedules, long commutes, changing weather, heat, dust, and pollution, our
              skin and hair go through a lot every single day.
            </p>
            <p className="text-[15px] font-light leading-[1.8] text-ink/65 sm:text-base">
              That&apos;s why taking care of yourself isn&apos;t just for special occasions anymore.
              It&apos;s become part of everyday life.
            </p>
          </div>
        </div>
      </section>

      {/* Why Ziva */}
      <section className="relative overflow-hidden border-b border-ink/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_70%_at_100%_0%,rgba(226,185,157,0.2),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-8xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/40">
              02 — Why Ziva
            </p>
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
              So why did we create Ziva Beauty?
            </h2>
            <p className="mt-6 text-[15px] font-light leading-[1.8] text-ink/65 sm:text-base">
              Because somewhere along the way, taking care of yourself started feeling more
              complicated than it needed to be.
            </p>
          </div>
          <div className="space-y-8 lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-3">
              {["Another product", "Another trend", "Another “right” way"].map((line) => (
                <p
                  key={line}
                  className="border-l-2 border-gold/50 pl-4 text-[14px] font-medium leading-snug text-ink/80"
                >
                  {line}
                </p>
              ))}
            </div>
            <p className="text-[15px] font-light leading-[1.8] text-ink/65 sm:text-base">
              One person tells you ten steps are essential. Another says you only need three. After a
              while, it&apos;s hard to know what actually works.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                "Fit into real life",
                "Don't overthink",
                "Enjoy using them",
              ].map((line) => (
                <div
                  key={line}
                  className="bg-porcelain px-5 py-6 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-ink"
                >
                  {line}
                </div>
              ))}
            </div>
            <p className="text-lg font-medium leading-snug text-ink sm:text-xl">
              A brand that helps you enjoy the routine you already have.
            </p>
            <p className="text-[15px] font-light leading-[1.8] text-ink/65 sm:text-base">
              At Ziva Beauty, we create skincare, makeup, hair care, and thoughtfully curated beauty
              kits designed to fit naturally into everyday life. We don&apos;t believe there&apos;s a
              perfect routine.
            </p>
          </div>
        </div>
      </section>

      {/* Realised — pull quote full width */}
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-8xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-cream/40">
            03 — What we realised
          </p>
          <blockquote className="max-w-4xl font-serif text-3xl font-medium leading-[1.2] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            No two people get ready the same way.
          </blockquote>
          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-16">
            <p className="text-[15px] font-light leading-[1.85] text-cream/70 sm:text-base">
              Some people love spending twenty minutes on their skincare. Others are out the door
              with five minutes to spare. Some never skip mascara. Some are happiest with clean skin
              and tied-back hair. Some have been following the same routine for years. Others are
              only just beginning.
            </p>
            <div className="flex flex-col justify-between gap-8">
              <p className="text-xl font-medium text-gold sm:text-2xl">
                None of them are doing it wrong.
              </p>
              <p className="text-[15px] font-light leading-[1.85] text-cream/70 sm:text-base">
                The best routine isn&apos;t the longest one.
                <br />
                It&apos;s the one that fits your life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Made for everyone */}
      <section className="border-b border-ink/8">
        <div className="mx-auto max-w-8xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/40">
              04 — For everyone
            </p>
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
              Made for every kind of routine.
            </h2>
            <p className="mt-5 text-[15px] font-light leading-[1.8] text-ink/65 sm:text-base">
              That&apos;s why our products are made for everyone — because good skincare and hair
              care don&apos;t belong to one kind of person. They belong to anyone who wants to take a
              little better care of themselves.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            {madeFor.map((item) => (
              <li
                key={item}
                className="flex min-h-[88px] items-center justify-center border border-ink/10 bg-porcelain/60 px-4 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-gold hover:bg-gold-soft/40"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What you'll find */}
      <section className="relative overflow-hidden border-b border-ink/8 bg-porcelain/40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_0%_50%,rgba(226,185,157,0.22),transparent_55%)]" />
        <div className="relative mx-auto max-w-8xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/40">
                05 — The collection
              </p>
              <h2 className="font-serif text-3xl font-medium leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
                What you&apos;ll find here.
              </h2>
            </div>
            <p className="text-[15px] font-light leading-[1.8] text-ink/60 lg:col-span-6 lg:text-right">
              Nothing created just to fill your shelf. Everything created with the hope that one day
              you&apos;ll reach for it without even thinking.
            </p>
          </div>
          <div className="grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {findHere.map((item) => (
              <div key={item.title} className="bg-white px-6 py-10 sm:py-12">
                <h3 className="text-[12px] font-bold uppercase tracking-[0.18em] text-gold-deep">
                  {item.title}
                </h3>
                <p className="mt-4 text-[15px] font-light leading-relaxed text-ink/65">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-lg font-medium text-ink sm:text-xl">
            Because that&apos;s when a product becomes part of your life.
          </p>
        </div>
      </section>

      {/* What matters */}
      <section className="border-b border-ink/8">
        <div className="mx-auto grid max-w-8xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/40">
              06 — What matters
            </p>
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
              Not more products.
              <span className="mt-2 block text-gold-deep">Better everyday experiences.</span>
            </h2>
            <p className="mt-6 text-[15px] font-light leading-[1.8] text-ink/65 sm:text-base">
              We don&apos;t want to create products you&apos;ll use once and forget about. For us,
              that&apos;s always been the goal.
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {matters.map((line, i) => (
              <li
                key={line}
                className="flex gap-4 border-t border-ink/10 pt-5"
              >
                <span className="text-[11px] font-bold tracking-[0.2em] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] font-medium leading-snug text-ink sm:text-base">
                  {line}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Thank you */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_100%,rgba(226,185,157,0.25),transparent_55%)]" />
        <div className="relative mx-auto max-w-8xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/40">
            07 — Thank you
          </p>
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-medium leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
            Thank you for being here.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] font-light leading-[1.85] text-ink/65 sm:text-base">
            Whether you came looking for skincare, makeup, hair care, or simply wanted to know who
            we are, we&apos;re glad you found us. We hope Ziva Beauty becomes a small part of your
            mornings, your evenings, your celebrations, and all the little moments in between.
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-snug text-ink">
            Sometimes, taking a few minutes for yourself is all you need to make the day feel a
            little better.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-16 text-cream sm:py-20">
        <div className="mx-auto flex max-w-8xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
              See What We&apos;ve Created
            </h2>
            <p className="mt-3 max-w-md text-[15px] font-light leading-relaxed text-cream/60">
              Skincare, makeup, hair care, and beauty kits — made for the routine that fits your
              life.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex shrink-0 items-center gap-2 bg-cream px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-opacity hover:opacity-90"
          >
            Explore the Collection
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
