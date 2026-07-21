import type { LucideIcon } from "lucide-react";
import { Droplets, Leaf, Sparkles, Scissors, Wind, Sun, Palette, Gem, ShieldCheck } from "lucide-react";

export interface CategoryHighlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface CategoryPageConfig {
  slug: string;
  category: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  heroImage: string;
  heroDescription: string;
  editorialTitle: string;
  editorialBody: string;
  highlights: CategoryHighlight[];
  ritualSteps: { step: string; title: string; detail: string }[];
  ctaTitle: string;
  ctaDescription: string;
}

export const skincarePage: CategoryPageConfig = {
  slug: "skincare",
  category: "Skincare",
  eyebrow: "The Skin Ritual",
  title: "Skincare",
  titleAccent: "Collection",
  heroImage: "/Korean Glass glow Facial kit/thumbnail.webp",
  heroDescription:
    "Dermatologist-tested botanical rituals — from glass-skin facials to active gold elixirs — crafted for visible radiance and lasting barrier health.",
  editorialTitle: "Where Science Meets the Sacred Ritual",
  editorialBody:
    "Every Ziva skincare formula begins with clinically refined actives — niacinamide, hyaluronic acid, rice water, and 24K gold complexes — suspended in clean, vegan bases free from parabens and synthetics. Whether you are building a morning glow routine or a restorative night ceremony, our collection is designed to layer beautifully and deliver results you can see in the mirror.",
  highlights: [
    { icon: Droplets, title: "Deep Hydration", description: "Multi-weight hyaluronic complexes for 72-hour moisture retention." },
    { icon: Sparkles, title: "Glass-Skin Finish", description: "K-beauty inspired formulas for poreless, luminous radiance." },
    { icon: Gem, title: "Active Gold", description: "24K gold particles and pearl extracts for bridal-ready glow." },
    { icon: Leaf, title: "Clean & Vegan", description: "100% vegan formulations without parabens or harsh synthetics." },
  ],
  ritualSteps: [
    { step: "01", title: "Cleanse", detail: "Begin with a gentle botanical cleanser to reset your canvas." },
    { step: "02", title: "Treat", detail: "Layer serums and elixirs targeting your specific skin concerns." },
    { step: "03", title: "Moisturize", detail: "Seal in actives with a rich cream or facial kit finale." },
    { step: "04", title: "Protect", detail: "Finish with SPF during the day for lasting luminosity." },
  ],
  ctaTitle: "Build Your Skin Ceremony",
  ctaDescription: "Not sure where to start? Take our interactive skin quiz on the homepage or explore the full skincare catalog.",
};

export const hairCarePage: CategoryPageConfig = {
  slug: "hair-care",
  category: "Hair Care",
  eyebrow: "The Hair Ritual",
  title: "Hair Care",
  titleAccent: "Collection",
  heroImage: "/Keratin Shampoo/thumbnail.webp",
  heroDescription:
    "Salon-grade botanical hair care — keratin repair, deep nourishment, and strength-building formulas for hair that moves with luminous health.",
  editorialTitle: "Strength, Shine & Restoration",
  editorialBody:
    "From keratin-infused shampoos to restorative masques, Ziva hair care treats every strand with the same botanical precision we bring to skincare. Our formulas are enriched with tsubaki oil, caviar extracts, and protein complexes that repair damage, reduce breakage, and restore natural movement — without silicones that weigh hair down.",
  highlights: [
    { icon: Wind, title: "Keratin Repair", description: "Rebuild damaged cuticles for smoother, stronger strands." },
    { icon: Droplets, title: "Deep Nourishment", description: "Botanical oils penetrate the shaft for lasting hydration." },
    { icon: Scissors, title: "Breakage Defense", description: "Strengthening complexes reduce split ends and fallout." },
    { icon: Sun, title: "Heat Protection", description: "Shield hair from styling damage and environmental stress." },
  ],
  ritualSteps: [
    { step: "01", title: "Cleanse", detail: "Use a keratin shampoo to gently cleanse without stripping." },
    { step: "02", title: "Condition", detail: "Apply a nourishing conditioner from mid-length to ends." },
    { step: "03", title: "Treat", detail: "Weekly masque for deep repair and salon-level softness." },
    { step: "04", title: "Seal", detail: "Finish with a lightweight serum for shine and protection." },
  ],
  ctaTitle: "Restore Your Hair's Natural Beauty",
  ctaDescription: "Explore our complete hair care range or pair with skincare for a full head-to-toe Ziva ritual.",
};

export const makeupPage: CategoryPageConfig = {
  slug: "makeup",
  category: "Makeup",
  eyebrow: "The Color Ritual",
  title: "Makeup",
  titleAccent: "Collection",
  heroImage: "/Lipsticks/thumbnail.webp",
  heroDescription:
    "Luxury colour cosmetics — velvet mattes, luminous primers, and flawless foundations — infused with skincare actives for beauty that cares for your skin.",
  editorialTitle: "Colour That Performs & Protects",
  editorialBody:
    "Ziva makeup is formulated with the same clean-beauty standards as our skincare. Richly pigmented lipsticks infused with vitamin E and shea butter, grip primers that extend wear while nourishing pores, and foundations in inclusive shades that blur imperfections without clogging. Every product is designed to look editorial and feel weightless all day.",
  highlights: [
    { icon: Palette, title: "Rich Pigment", description: "High-impact colour payoff in a single swipe." },
    { icon: Sparkles, title: "Skincare Infused", description: "Vitamins and botanicals nourish while you wear." },
    { icon: Gem, title: "Long-Wear Comfort", description: "Velvet textures that stay comfortable for hours." },
    { icon: ShieldCheck, title: "Clean Formula", description: "No talc, parabens, or harsh fillers." },
  ],
  ritualSteps: [
    { step: "01", title: "Prime", detail: "Smooth and grip the canvas with a nourishing primer." },
    { step: "02", title: "Perfect", detail: "Apply foundation for an even, luminous base." },
    { step: "03", title: "Define", detail: "Add colour with lipsticks and defining accents." },
    { step: "04", title: "Set", detail: "Lock in your look for all-day editorial finish." },
  ],
  ctaTitle: "Find Your Signature Look",
  ctaDescription: "Browse every shade and formula in our makeup collection — from bridal glow to everyday elegance.",
};

export const aboutContent = {
  eyebrow: "Our Story",
  title: "About",
  titleAccent: "Ziva",
  heroImage: "/Magic Cream/thumbnail.webp",
  intro:
    "ZIVA was born from a simple belief: luxury beauty should feel joyful, perform brilliantly, and respect both your skin and the planet. We craft dermatologist-tested skincare, hair care, and colour cosmetics powered by feel-good botanicals and gold-standard actives.",
  story: [
    {
      title: "The Beginning",
      body: "Founded in India with a vision to bring K-beauty innovation and bridal luxury to everyday rituals, Ziva started with a single glass-glow facial kit. Today, our collection spans skincare elixirs, salon-grade hair care, and editorial makeup — each formula refined through clinical testing and customer love.",
    },
    {
      title: "Our Philosophy",
      body: "We believe beauty is a ceremony, not a chore. Every product is designed to layer beautifully, deliver visible results, and elevate your daily routine into a moment of self-care. Clean formulations, transparent ingredients, and honest pricing are non-negotiable.",
    },
    {
      title: "Craft & Quality",
      body: "From 24K gold complexes to keratin repair systems, we source the finest actives and suspend them in vegan, paraben-free bases. Our formulas are tested for efficacy, safety, and the luxurious sensorial experience Ziva is known for.",
    },
  ],
  values: [
    { icon: ShieldCheck, title: "Clean Formulations", description: "100% vegan, organic actives, formulated without parabens or synthetics." },
    { icon: Leaf, title: "Eco Conscious", description: "Recycled glass packaging and biodegradable inks across our range." },
    { icon: Sparkles, title: "Happiness Guarantee", description: "Love the formula, or receive a full refund within 30 days of shipment." },
    { icon: Gem, title: "Clinical Refinement", description: "Every active is chosen for proven efficacy and visible results." },
  ],
  stats: [
    { value: "50K+", label: "Happy Customers" },
    { value: "13", label: "Signature Products" },
    { value: "100%", label: "Vegan Formulas" },
    { value: "4.9★", label: "Average Rating" },
  ],
};

export const contactContent = {
  eyebrow: "Get In Touch",
  title: "Contact",
  titleAccent: "Us",
  intro: "Whether you have a question about an order, need product advice, or want to explore wholesale partnerships — our concierge team is here to help.",
  email: "hello@zivabeauty.com",
  phone: "+91 98765 43210",
  address: "Ziva Beauty Pvt. Ltd.\n12, Luxury Lane, Bandra West\nMumbai, Maharashtra 400050",
  hours: [
    { day: "Monday – Friday", time: "10:00 AM – 7:00 PM IST" },
    { day: "Saturday", time: "10:00 AM – 5:00 PM IST" },
    { day: "Sunday", time: "Closed" },
  ],
  faqs: [
    { q: "How long does shipping take?", a: "Orders ship within 1–2 business days. Delivery typically takes 3–7 days across India." },
    { q: "What is your return policy?", a: "We offer a 30-day happiness guarantee. Contact us with your order ID to initiate a return." },
    { q: "Are your products cruelty-free?", a: "Yes — all Ziva products are 100% vegan and never tested on animals." },
  ],
};
