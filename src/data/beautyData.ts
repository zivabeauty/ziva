export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  rating: number;
  image: string;
  hoverImage: string;
  description: string;
  sizes: string[];
  badge: string;
  ingredients?: string;
  usage?: string;
  desc?: string;
  gallery?: string[];
  /* ─── Optional merchandising metadata (used by the catalog filters).
     When absent, lib/product-utils.ts derives sensible values so the data
     works whether it comes from this file or from Supabase. ─── */
  type?: string;
  skinTypes?: string[];
  inStock?: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  reviews?: number;
}

export interface HeroSlide {
  id: number;
  image: string;
  tagline: string;
  title: string;
  titleAccent: string;
  description: string;
}

export interface Category {
  name: string;
  count: string;
  image: string;
  href?: string;
}

export interface Collection {
  title: string;
  desc: string;
  image: string;
}

export interface SkinConcern {
  name: string;
  tag: string;
}

export interface Ingredient {
  name: string;
  image: string;
  benefits: string;
  recommendedProducts: string[];
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

/* ═══════════════════════════════════════════════ */
/*                  HERO SLIDES                    */
/* ═══════════════════════════════════════════════ */

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/homeHero_banner.png",
    tagline: "New Arrival",
    title: "Glow",
    titleAccent: "That Lasts",
    description: "Nourish. Repair. Radiate. Beauty that stays with you — featuring our Keratin Mask."
  },
  
];

/* ═══════════════════════════════════════════════ */
/*                   PRODUCTS                      */
/* ═══════════════════════════════════════════════ */

export const products: Product[] = [
  {
    id: 1,
    name: "Korean Glass Glow Facial Kit",
    category: "Skincare",
    price: "₹1,299",
    oldPrice: "₹1,799",
    rating: 5,
    image: "/Korean Glass glow Facial kit/thumbnail.png",
    hoverImage: "/Korean Glass glow Facial kit/2.png",
    description: "A professional 7-step facial kit inspired by Korean skincare rituals. Infused with rice water, niacinamide, and hyaluronic acid for an intense glass-like glow that lasts for days.",
    sizes: ["Single Kit", "Pack of 2"],
    badge: "Bestseller",
    ingredients: "Rice Water Extract, Niacinamide, Hyaluronic Acid, Green Tea, Pearl Powder, Aloe Vera, Vitamin E.",
    usage: "Use each sachet in order from Step 1 to Step 7. Apply evenly on clean face, massage gently, and rinse after recommended time. Best used once a week.",
    gallery: ["/Korean Glass glow Facial kit/1.png", "/Korean Glass glow Facial kit/2.png", "/Korean Glass glow Facial kit/3.png", "/Korean Glass glow Facial kit/4.png", "/Korean Glass glow Facial kit/5.png", "/Korean Glass glow Facial kit/6.png"]
  },
  {
    id: 2,
    name: "Bridal Bright Facial Kit",
    category: "Skincare",
    price: "₹1,499",
    oldPrice: "₹1,999",
    rating: 5,
    image: "/Bridal bright facial kit/thumbnail.png",
    hoverImage: "/Bridal bright facial kit/2.png",
    description: "Designed for the most special day of your life. This bridal-grade facial kit is enriched with 24K gold particles, saffron, and pearl extracts for a radiant, camera-ready finish that makes you glow from within.",
    sizes: ["Single Kit", "Pack of 3"],
    badge: "Bridal",
    ingredients: "24K Gold Particles, Saffron Extract, Pearl Powder, Rose Water, Vitamin C, Mulberry Extract, Shea Butter.",
    usage: "Follow the numbered steps for a complete at-home bridal facial. Start with cleanser, followed by scrub, massage cream, face pack, and serum. Allow 15 minutes between steps.",
    gallery: ["/Bridal bright facial kit/2.png", "/Bridal bright facial kit/3.png", "/Bridal bright facial kit/4.png", "/Bridal bright facial kit/5.png", "/Bridal bright facial kit/6.png", "/Bridal bright facial kit/7.png"]
  },
  {
    id: 3,
    name: "Magic Cream - Instant Glow Moisturizer",
    category: "Skincare",
    price: "₹599",
    oldPrice: "₹899",
    rating: 5,
    image: "/Magic Cream/thumbnail.png",
    hoverImage: "/Magic Cream/2.png",
    description: "A lightweight, fast-absorbing daily moisturizer that delivers instant radiance. Formulated with hyaluronic acid, vitamin E, and natural botanicals for 24-hour hydration and a dewy, youthful glow.",
    sizes: ["50g", "100g"],
    badge: "Sale",
    ingredients: "Hyaluronic Acid, Vitamin E, Aloe Vera Gel, Shea Butter, Jojoba Oil, Niacinamide, Rose Water.",
    usage: "Apply a pea-sized amount on clean face and neck after cleansing. Massage gently in upward circular motions. Use morning and night for best results.",
    gallery: ["/Magic Cream/1.png", "/Magic Cream/2.png", "/Magic Cream/3.png", "/Magic Cream/4.png", "/Magic Cream/5.png", "/Magic Cream/7.png"]
  },
  {
    id: 4,
    name: "D-Tan Pack - Sun Damage Repair",
    category: "Skincare",
    price: "₹499",
    oldPrice: "₹799",
    rating: 4,
    image: "/D-Tan Pack/thumbnail.png",
    hoverImage: "/D-Tan Pack/2.png",
    description: "An advanced de-tanning treatment enriched with milk proteins, liquorice extract, and vitamin C. Targets stubborn tan, dark patches, and sun damage for visibly brighter, even-toned skin.",
    sizes: ["100g", "200g"],
    badge: "Popular",
    ingredients: "Milk Protein Extract, Liquorice Root, Vitamin C, Kojic Acid, Cucumber Extract, Kaolin Clay, Tomato Lycopene.",
    usage: "Apply a thick layer on tanned areas. Leave for 15-20 minutes until semi-dry. Scrub gently with wet fingers and rinse thoroughly. Use 2-3 times a week for best results.",
    gallery: ["/D-Tan Pack/1.png", "/D-Tan Pack/2.png", "/D-Tan Pack/3.png", "/D-Tan Pack/4.png", "/D-Tan Pack/6.png", "/D-Tan Pack/7.png"]
  },
  {
    id: 5,
    name: "Diamond Facial Scrub",
    category: "Skincare",
    price: "₹699",
    oldPrice: "₹999",
    rating: 5,
    image: "/Diamond Facial Scrub/thumbnail.png",
    hoverImage: "/Diamond Facial Scrub/2.png",
    description: "A luxurious diamond-infused facial scrub that gently buffs away dead skin cells, blackheads, and impurities. Reveals a polished, luminous complexion with micro-diamond particles and walnut shell powder.",
    sizes: ["100g", "200g"],
    badge: "Luxury",
    ingredients: "Micro Diamond Powder, Walnut Shell Granules, Vitamin E, Aloe Vera, Glycolic Acid, Chamomile Extract, Rose Hip Oil.",
    usage: "Take a small amount on damp fingertips. Gently massage on face in circular motions for 2-3 minutes, avoiding the eye area. Rinse with cool water. Use twice a week.",
    gallery: ["/Diamond Facial Scrub/1.png", "/Diamond Facial Scrub/2.png", "/Diamond Facial Scrub/4.png", "/Diamond Facial Scrub/5.png", "/Diamond Facial Scrub/6.png"]
  },
  {
    id: 6,
    name: "Micro Polishing Exfoliant",
    category: "Skincare",
    price: "₹549",
    oldPrice: "₹799",
    rating: 4,
    image: "/Micro Polishing Exfoliant/thumbnail.png",
    hoverImage: "/Micro Polishing Exfoliant/2.png",
    description: "A professional-grade micro-polishing exfoliant that refines skin texture, minimizes pores, and promotes cell renewal. Ultra-fine micro-granules gently resurface the skin without irritation.",
    sizes: ["100g", "150g"],
    badge: "New",
    ingredients: "Micro Silica Beads, Salicylic Acid, Tea Tree Oil, Green Clay, Papaya Enzyme, Lactic Acid, Witch Hazel.",
    usage: "Apply on damp face after cleansing. Massage gently for 1-2 minutes in upward strokes. Rinse thoroughly. Follow with toner and moisturizer. Use 2-3 times weekly.",
    gallery: ["/Micro Polishing Exfoliant/1.png", "/Micro Polishing Exfoliant/2.png", "/Micro Polishing Exfoliant/3.png", "/Micro Polishing Exfoliant/4.png", "/Micro Polishing Exfoliant/5.png", "/Micro Polishing Exfoliant/7.png"]
  },
  {
    id: 7,
    name: "Magic Grip Primer",
    category: "Makeup",
    price: "₹799",
    oldPrice: "₹1,199",
    rating: 5,
    image: "/Magic Grip Primer/thumbnail.png",
    hoverImage: "/Magic Grip Primer/2.png",
    description: "A revolutionary pore-blurring primer that creates a flawless canvas for makeup. Gel-based formula grips foundation for up to 16 hours while hydrating and smoothing skin texture.",
    sizes: ["30ml", "50ml"],
    badge: "Bestseller",
    ingredients: "Dimethicone, Hyaluronic Acid, Silica Microspheres, Vitamin E, Green Tea Extract, Glycerin, Niacinamide.",
    usage: "After moisturizer, apply a thin layer across the face focusing on pores and fine lines. Wait 60 seconds before applying foundation. Works with all foundation types.",
    gallery: ["/Magic Grip Primer/1.png", "/Magic Grip Primer/2.png", "/Magic Grip Primer/4.png", "/Magic Grip Primer/5.png", "/Magic Grip Primer/6.png", "/Magic Grip Primer/7.png"]
  },
  {
    id: 8,
    name: "Ziva Foundation - Shade 001 (Fair)",
    category: "Makeup",
    price: "₹899",
    oldPrice: "₹1,299",
    rating: 5,
    image: "/Foundation (all three shades)/Ziva 001/thumbnail.png",
    hoverImage: "/Foundation (all three shades)/Ziva 001/2.png",
    description: "A medium-to-full coverage liquid foundation with a natural satin finish. Buildable, blendable formula infused with SPF 30 and skin-loving botanicals. Shade 001 for fair skin tones.",
    sizes: ["30ml"],
    badge: "New",
    ingredients: "Titanium Dioxide (SPF 30), Hyaluronic Acid, Vitamin E, Jojoba Oil, Silica, Iron Oxides, Aloe Vera Extract.",
    usage: "Shake well. Apply dots across forehead, cheeks, nose, and chin. Blend outward with fingers, sponge, or brush. Build coverage as needed.",
    gallery: ["/Foundation (all three shades)/Ziva 001/1.png", "/Foundation (all three shades)/Ziva 001/2.png", "/Foundation (all three shades)/Ziva 001/3.png", "/Foundation (all three shades)/Ziva 001/4.png", "/Foundation (all three shades)/Ziva 001/5.png", "/Foundation (all three shades)/Ziva 001/7.png"]
  },
  {
    id: 9,
    name: "Ziva Foundation - Shade 002 (Medium)",
    category: "Makeup",
    price: "₹899",
    oldPrice: "₹1,299",
    rating: 5,
    image: "/Foundation (all three shades)/Ziva 002/thumbnail.png",
    hoverImage: "/Foundation (all three shades)/Ziva 002/2.png",
    description: "A medium-to-full coverage liquid foundation with a natural satin finish. Buildable, blendable formula infused with SPF 30 and skin-loving botanicals. Shade 002 for medium skin tones.",
    sizes: ["30ml"],
    badge: "New",
    ingredients: "Titanium Dioxide (SPF 30), Hyaluronic Acid, Vitamin E, Jojoba Oil, Silica, Iron Oxides, Aloe Vera Extract.",
    usage: "Shake well. Apply dots across forehead, cheeks, nose, and chin. Blend outward with fingers, sponge, or brush. Build coverage as needed.",
    gallery: ["/Foundation (all three shades)/Ziva 002/1.png", "/Foundation (all three shades)/Ziva 002/2.png", "/Foundation (all three shades)/Ziva 002/3.png", "/Foundation (all three shades)/Ziva 002/4.png", "/Foundation (all three shades)/Ziva 002/5.png", "/Foundation (all three shades)/Ziva 002/6.png"]
  },
  {
    id: 10,
    name: "Ziva Foundation - Shade 003 (Dusky)",
    category: "Makeup",
    price: "₹899",
    oldPrice: "₹1,299",
    rating: 5,
    image: "/Foundation (all three shades)/Ziva 003/thumbnail.png",
    hoverImage: "/Foundation (all three shades)/Ziva 003/2.png",
    description: "A medium-to-full coverage liquid foundation with a natural satin finish. Buildable, blendable formula infused with SPF 30 and skin-loving botanicals. Shade 003 for dusky and deep skin tones.",
    sizes: ["30ml"],
    badge: "New",
    ingredients: "Titanium Dioxide (SPF 30), Hyaluronic Acid, Vitamin E, Jojoba Oil, Silica, Iron Oxides, Aloe Vera Extract.",
    usage: "Shake well. Apply dots across forehead, cheeks, nose, and chin. Blend outward with fingers, sponge, or brush. Build coverage as needed.",
    gallery: ["/Foundation (all three shades)/Ziva 003/1.png", "/Foundation (all three shades)/Ziva 003/2.png", "/Foundation (all three shades)/Ziva 003/3.png", "/Foundation (all three shades)/Ziva 003/4.png", "/Foundation (all three shades)/Ziva 003/5.png"]
  },
  {
    id: 11,
    name: "Ziva Luxury Matte Lipstick",
    category: "Makeup",
    price: "₹599",
    oldPrice: "₹899",
    rating: 5,
    image: "/Lipsticks/thumbnail.png",
    hoverImage: "/Lipsticks/3.png",
    description: "A richly pigmented matte lipstick with a velvet-smooth texture. Infused with vitamin E and shea butter for long-lasting colour that stays comfortable all day without drying your lips.",
    sizes: ["3.5g"],
    badge: "Popular",
    ingredients: "Candelilla Wax, Shea Butter, Vitamin E, Natural Iron Oxides, Jojoba Seed Oil, Castor Oil, Beeswax.",
    usage: "Apply directly from the bullet or use a lip brush for precision. For a bolder look, line lips first with a lip liner. Reapply after meals.",
    gallery: ["/Lipsticks/2.png", "/Lipsticks/3.png", "/Lipsticks/4.png", "/Lipsticks/5.png", "/Lipsticks/6.png", "/Lipsticks/7.png"]
  },
  {
    id: 12,
    name: "Keratin Repair Shampoo",
    category: "Hair Care",
    price: "₹449",
    oldPrice: "₹699",
    rating: 4,
    image: "/Keratin Shampoo/thumbnail.png",
    hoverImage: "/Keratin Shampoo/3.png",
    description: "A salon-grade keratin-infused shampoo that gently cleanses while repairing damaged hair bonds. Restores shine, reduces frizz, and strengthens hair from root to tip with every wash.",
    sizes: ["200ml", "400ml"],
    badge: "Featured",
    ingredients: "Hydrolyzed Keratin, Argan Oil, Biotin, Pro-Vitamin B5, Coconut Oil, Silk Amino Acids, Aloe Vera.",
    usage: "Wet hair thoroughly. Apply a coin-sized amount, lather gently from scalp to tips. Leave for 2 minutes, then rinse. Follow with Ziva Keratin Mask for best results.",
    gallery: ["/Keratin Shampoo/1.png", "/Keratin Shampoo/3.png", "/Keratin Shampoo/4.png", "/Keratin Shampoo/5.png", "/Keratin Shampoo/6.png"]
  },
  {
    id: 13,
    name: "Keratin Deep Repair Hair Mask",
    category: "Hair Care",
    price: "₹549",
    oldPrice: "₹849",
    rating: 5,
    image: "/Keratin Mask/thumbnail.png",
    hoverImage: "/Keratin Mask/3.png",
    description: "An intensive keratin hair treatment mask that penetrates deep into the hair shaft to repair breakage, restore elasticity, and lock in moisture. Leaves hair silky smooth and frizz-free for days.",
    sizes: ["200g", "400g"],
    badge: "Premium",
    ingredients: "Hydrolyzed Keratin, Argan Oil, Shea Butter, Avocado Oil, Silk Proteins, Vitamin E, Coconut Milk Extract.",
    usage: "After shampooing, apply generously from mid-lengths to ends. Leave for 10-15 minutes. For deeper conditioning, wrap hair in a warm towel. Rinse thoroughly. Use 1-2 times a week.",
    gallery: ["/Keratin Mask/2.png", "/Keratin Mask/3.png", "/Keratin Mask/4.png", "/Keratin Mask/5.png"]
  },
  {
    id: 14,
    name: "Ziva Beauty Combo Set",
    category: "Combo",
    price: "₹2,499",
    oldPrice: "₹3,999",
    rating: 5,
    image: "/Combo/thumbnail.png",
    hoverImage: "/Combo/2.png",
    description: "The ultimate Ziva Beauty starter set featuring our bestselling skincare and makeup essentials. A curated collection designed to give you a complete beauty routine at an unbeatable value.",
    sizes: ["Full Set"],
    badge: "Value Pack",
    ingredients: "Includes a curated selection of Ziva skincare and makeup products.",
    usage: "Follow the included routine guide for the perfect daily beauty regimen. Start with skincare, then apply makeup products.",
    gallery: ["/Combo/1.png", "/Combo/2.png", "/Combo/3.png", "/Combo/4.png"]
  }
];

/* ═══════════════════════════════════════════════ */
/*                  CATEGORIES                     */
/* ═══════════════════════════════════════════════ */

export const categories: Category[] = [
  {
    name: "Facial Kits",
    count: "2 Products",
    image: "/Korean Glass glow Facial kit/thumbnail.png",
    href: "/skincare"
  },
  {
    name: "Skincare",
    count: "4 Products",
    image: "/Magic Cream/thumbnail.png",
    href: "/skincare"
  },
  {
    name: "Foundation",
    count: "3 Shades",
    image: "/Foundation (all three shades)/Ziva 001/thumbnail.png",
    href: "/makeup"
  },

  {
    name: "Primer",
    count: "1 Product",
    image: "/Magic Grip Primer/thumbnail.png",
    href: "/makeup"
  },
  {
    name: "Hair Care",
    count: "2 Products",
    image: "/Keratin Shampoo/thumbnail.png",
    href: "/hair-care"
  },
 
];

/* ═══════════════════════════════════════════════ */
/*              FEATURED COLLECTIONS               */
/* ═══════════════════════════════════════════════ */

export const featuredCollections: Collection[] = [
  {
    title: "Bridal Glow Collection",
    desc: "Get wedding-ready with our bridal facial kit and luminous makeup essentials.",
    image: "/Bridal bright facial kit/thumbnail.png"
  },
  {
    title: "K-Beauty Essentials",
    desc: "Achieve the coveted Korean glass-skin with our professional facial kit.",
    image: "/Korean Glass glow Facial kit/thumbnail.png"
  },
  {
    title: "Keratin Hair Ritual",
    desc: "Professional keratin repair system for salon-smooth, frizz-free hair.",
    image: "/Keratin Shampoo/thumbnail.png"
  }
];

/* ═══════════════════════════════════════════════ */
/*                SKIN CONCERNS                    */
/* ═══════════════════════════════════════════════ */

export const skinConcerns: SkinConcern[] = [
  { name: "Acne", tag: "Clarifying" },
  { name: "Dry Skin", tag: "Intense Hydration" },
  { name: "Oily Skin", tag: "Mattifying & Pore Care" },
  { name: "Sensitive Skin", tag: "Soothing Barrier" },
  { name: "Pigmentation", tag: "Brightening Therapy" },
  { name: "Sun Tan", tag: "D-Tan Repair" },
  { name: "Anti Aging", tag: "Youth Revival" },
  { name: "Dull Skin", tag: "Glow Boost" }
];

/* ═══════════════════════════════════════════════ */
/*              HAIR CARE CATEGORIES               */
/* ═══════════════════════════════════════════════ */

export const hairCareCategories: string[] = [
  "Keratin Treatment",
  "Frizz Control",
  "Damage Repair",
  "Hair Fall Protection",
  "Scalp Care",
  "Deep Conditioning"
];

/* ═══════════════════════════════════════════════ */
/*               MEN'S PRODUCTS                    */
/* ═══════════════════════════════════════════════ */

export const mensProducts: Product[] = [
  {
    id: 15,
    name: "Ziva Men's D-Tan Pack",
    category: "Men's Grooming",
    desc: "Advanced de-tanning formula for men's stubborn tan and sun damage.",
    description: "Advanced de-tanning formula for men's stubborn tan and sun damage.",
    price: "₹499",
    rating: 5,
    sizes: ["100g"],
    badge: "Homme",
    image: "/D-Tan Pack/thumbnail.png",
    hoverImage: "/D-Tan Pack/3.png"
  },
  {
    id: 16,
    name: "Ziva Men's Diamond Scrub",
    category: "Men's Grooming",
    desc: "Deep-cleansing diamond scrub for rough, tired skin.",
    description: "Deep-cleansing diamond scrub for rough, tired skin.",
    price: "₹699",
    rating: 5,
    sizes: ["100g"],
    badge: "Homme",
    image: "/Diamond Facial Scrub/thumbnail.png",
    hoverImage: "/Diamond Facial Scrub/4.png"
  }
];

/* ═══════════════════════════════════════════════ */
/*                 TESTIMONIALS                    */
/* ═══════════════════════════════════════════════ */

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "The Korean Glass Glow Facial Kit gave me the most incredible glow! My skin looked like porcelain after just one use. Absolutely love Ziva products!",
    author: "Priya Sharma",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    id: 2,
    quote: "I used the Bridal Bright Facial Kit before my wedding and my skin was glowing! My makeup artist couldn't stop complimenting my skin. Best investment ever.",
    author: "Ananya Gupta",
    role: "Bride-to-be",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    id: 3,
    quote: "The Keratin Shampoo and Mask duo completely transformed my damaged hair. It's now silky smooth and frizz-free. The results are salon-quality at home!",
    author: "Meera Patel",
    role: "Regular Customer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    id: 4,
    quote: "The Magic Grip Primer is a game-changer! My foundation stays put for 14+ hours without touchups. This is now a permanent part of my daily routine.",
    author: "Riya Khanna",
    role: "Makeup Enthusiast",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
    rating: 5
  }
];

/* ═══════════════════════════════════════════════ */
/*                INSTAGRAM IMAGES                 */
/* ═══════════════════════════════════════════════ */

export const instagramImages: string[] = [
  "/Korean Glass glow Facial kit/1.png",
  "/Magic Grip Primer/1.png",
  "/Lipsticks/5.png",
  "/Bridal bright facial kit/3.png",
  "/Foundation (all three shades)/Ziva 001/3.png",
  "/Keratin Shampoo/4.png"
];

/* ═══════════════════════════════════════════════ */
/*             FEATURED INGREDIENTS                */
/* ═══════════════════════════════════════════════ */

export const ingredientsData: Ingredient[] = [
  {
    name: "Hyaluronic Acid",
    image: "/Magic Cream/3.png",
    benefits: "Draws 1000x its weight in water deep into skin layers for extreme hydration, plumping, and a dewy glass-skin finish.",
    recommendedProducts: ["Korean Glass Glow Facial Kit", "Magic Cream"]
  },
  {
    name: "Keratin Protein",
    image: "/Keratin Mask/4.png",
    benefits: "Rebuilds damaged hair bonds, restores elasticity and shine, and seals split ends for salon-smooth results at home.",
    recommendedProducts: ["Keratin Repair Shampoo", "Keratin Deep Repair Hair Mask"]
  },
  {
    name: "Niacinamide",
    image: "/Korean Glass glow Facial kit/4.png",
    benefits: "Minimizes pore size, strengthens skin barrier, reduces dark spots, and regulates excess oil production for clearer skin.",
    recommendedProducts: ["Korean Glass Glow Facial Kit", "Magic Cream"]
  },
  {
    name: "Vitamin E",
    image: "/Lipsticks/4.png",
    benefits: "A powerful antioxidant that protects skin from environmental damage, locks in moisture, and promotes cellular repair.",
    recommendedProducts: ["Ziva Luxury Matte Lipstick", "Magic Cream"]
  },
  {
    name: "Diamond Powder",
    image: "/Diamond Facial Scrub/4.png",
    benefits: "Ultra-fine micro-diamond particles gently buff away dead skin cells, revealing a polished, luminous, and refined complexion.",
    recommendedProducts: ["Diamond Facial Scrub", "Micro Polishing Exfoliant"]
  },
  {
    name: "Saffron & Gold",
    image: "/Bridal bright facial kit/4.png",
    benefits: "Ancient Ayurvedic ingredients that brighten, nourish, and restore a natural golden radiance to dull, tired skin.",
    recommendedProducts: ["Bridal Bright Facial Kit"]
  }
];
