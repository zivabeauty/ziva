"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";

interface CtaBannerProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
  image?: string;
  imageAlt?: string;
}

/**
 * Editorial promo banner — porcelain panel with a thin gold frame, floating
 * product image and a magnetic CTA. Reused for home promos and collections.
 */
export default function CtaBanner({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  image,
  imageAlt = "",
}: CtaBannerProps) {
  return (
    <div className="grain relative flex min-h-[420px] items-center overflow-hidden bg-porcelain">
      <span className="pointer-events-none absolute inset-4 border border-gold/25" />

      {image && (
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="animate-luxe-float absolute bottom-0 right-10 top-0 my-auto hidden h-[340px] w-[340px] object-contain drop-shadow-[0_30px_50px_rgba(10,10,10,0.18)] md:block"
        />
      )}

      <div className="relative z-10 max-w-lg p-12 text-ink sm:p-16">
        {eyebrow && <span className="eyebrow mb-5">{eyebrow}</span>}
        <h2 className="display-xl mb-5 mt-2 text-4xl leading-[1.08] text-ink sm:text-5xl">{title}</h2>
        {description && (
          <p className="mb-9 max-w-sm text-[15px] font-light leading-relaxed text-ink/60">
            {description}
          </p>
        )}
        <Magnetic>
          <Link href={ctaHref} className="btn-luxe">
            <span>{ctaLabel}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Magnetic>
      </div>
    </div>
  );
}
