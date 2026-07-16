"use client";

import Link from "next/link";
import { 
  ShieldCheck, 
  Leaf, 
  Sparkles,
  Send
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const companyLinks = [
    { name: "About Ziva", href: "/about" },
    { name: "Our Philosophy", href: "/about" },
    { name: "Skincare", href: "/skincare" },
    { name: "Hair Care", href: "/hair-care" },
    { name: "Makeup", href: "/makeup" },
  ];

  const supportLinks = [
    { name: "Contact Support", href: "/contact" },
    { name: "Track Order", href: "#track" },
    { name: "Shipping & Customs", href: "#shipping" },
    { name: "Returns & Exchanges", href: "#returns" },
    { name: "FAQs", href: "#faqs" }
  ];

  const policyLinks = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Settings", href: "#cookies" },
    { name: "Accessibility", href: "#accessibility" }
  ];

  return (
    <footer className="bg-cream text-ink/60 border-t border-stone-100 font-sans tracking-wide relative z-10">

      {/* 1. Value Proposition Banner */}
      <div className="border-b border-stone-200/70 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

          <div className="flex flex-col md:flex-row items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-mint bg-mint-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-ink mb-1.5">Clean Formulations</h4>
              <p className="text-[11px] text-ink/50 max-w-xs leading-relaxed font-medium">100% vegan, organic actives, formulated without parabens or synthetics.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lavender bg-lavender-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-ink mb-1.5">Eco Conscious</h4>
              <p className="text-[11px] text-ink/50 max-w-xs leading-relaxed font-medium">Responsibility driven, utilizing recycled glass & biodegradable inks.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-pink bg-pink-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-ink mb-1.5">Happiness Guarantee</h4>
              <p className="text-[11px] text-ink/50 max-w-xs leading-relaxed font-medium">Love the formula, or receive a full refund within 30 days of shipment.</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-12">

          {/* Brand details */}
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <div className="flex items-center gap-1 select-none">
              <span className="text-2xl font-extrabold tracking-[0.2em] font-serif text-ink">ZIVA</span>
              <span className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_#E2B99D]"></span>
            </div>
            <p className="text-xs text-ink/55 leading-relaxed max-w-xs font-medium">
              Bright, joyful beauty, skincare, and cosmetics — powered by feel-good botanicals and glow-boosting actives your skin will love.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-2">
              <a href="#" className="p-2.5 rounded-2xl bg-pink-soft text-pink hover:bg-pink hover:text-white transition-all duration-300 hover:-translate-y-0.5" aria-label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-ink mb-5">Company</h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-ink/55 hover:text-lavender transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-ink mb-5">Customer Support</h4>
            <ul className="flex flex-col gap-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-ink/55 hover:text-lavender transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Newsletter Info */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-ink mb-5 font-sans">Join The Newsletter</h4>
            <p className="text-xs text-ink/55 mb-5 leading-relaxed font-medium">
              Sign up for new launches, glow tips, and a 10% off welcome treat.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <div className="flex items-center bg-white rounded-full pl-4 pr-1.5 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-lavender/40 transition-all">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full bg-transparent text-xs text-ink placeholder-stone-400 focus:outline-none font-medium"
                  required
                />
                <button
                  type="submit"
                  className="w-8 h-8 rounded-full bg-lavender text-white hover:bg-pink transition-colors ml-2 cursor-pointer flex items-center justify-center shrink-0"
                  aria-label="Join newsletter"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* 3. Footer Bottom */}
      <div className="bg-white py-8 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Links & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xs text-ink/50 text-center md:text-left font-medium">
            <p>© {new Date().getFullYear()} ZIVA Beauty. All rights reserved.</p>
            <div className="flex gap-4">
              {policyLinks.map((link) => (
                <Link key={link.name} href={link.href} className="hover:text-lavender transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Payment Icons */}
          <div className="flex items-center gap-3" aria-label="Accepted payment methods">
            {/* Visa */}
            <div className="flex h-10 w-14 items-center justify-center rounded-lg border border-stone-200 bg-[#3D2412] px-1.5">
              <svg className="h-full w-full" viewBox="0 0 36 24" fill="none" aria-hidden>
                <path d="M12 16L10.5 8H8.5L7 16H9L12 16Z" fill="#E2B99D"/>
                <path d="M17 8H13.5L12.5 16H14.5L15 13H18.5L19 16H21L19.5 8H17ZM15.5 11L18 11L17.5 8.5L15.5 11Z" fill="#E2B99D"/>
                <path d="M26.5 8H24L22.5 16H24.5L25 13H28L28.5 16H30.5L29 8H26.5ZM25.5 11.5L27 9L27.5 11.5H25.5Z" fill="#E2B99D"/>
              </svg>
            </div>

            {/* Mastercard */}
            <div className="flex h-10 w-14 items-center justify-center rounded-lg border border-stone-200 bg-[#3D2412] px-1.5">
              <svg className="h-full w-full" viewBox="0 0 36 24" fill="none" aria-hidden>
                <circle cx="15.5" cy="12" r="5.5" fill="#EB001B" fillOpacity="0.8"/>
                <circle cx="20.5" cy="12" r="5.5" fill="#F79E1B" fillOpacity="0.8"/>
              </svg>
            </div>

            {/* Google Pay */}
            <div className="flex h-10 w-14 items-center justify-center rounded-lg border border-stone-200 bg-white px-1.5">
              <Image
                src="/icons8-google-pay-24.png"
                alt="Google Pay"
                width={40}
                height={40}
                className="h-7 w-auto object-contain"
              />
            </div>

            {/* Apple Pay */}
            <div className="flex h-10 w-14 items-center justify-center rounded-lg border border-stone-200 bg-white px-1">
              <svg className="h-7 w-full" viewBox="0 0 50 50" aria-label="Apple Pay">
                <path
                  fill="currentColor"
                  className="text-ink"
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
