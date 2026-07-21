import type { Product } from "@/data/beautyData";
import { parsePrice, formatInr } from "@/lib/pricing";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useUiStore } from "@/store/ui.store";

export { parsePrice, formatInr };

/* ═══════════════════════════════════════════════════════════════ */
/*  Merchandising metadata derivation                                */
/*                                                                   */
/*  Products may arrive from this repo's static data or from         */
/*  Supabase. Either way we derive the extra facets the catalog      */
/*  filters need (type, skin types, stock, badges) deterministically */
/*  so the experience is identical regardless of the source.         */
/* ═══════════════════════════════════════════════════════════════ */

/** Human-readable price, e.g. "₹1,299". */
export const inr = (value: string | number | undefined) => formatInr(parsePrice(value));

/** Discount percentage from price vs oldPrice (0 when there's no saving). */
export function discountPercent(product: Pick<Product, "price" | "oldPrice">): number {
  const price = parsePrice(product.price);
  const old = parsePrice(product.oldPrice);
  return old > price ? Math.round(((old - price) / old) * 100) : 0;
}

/** Stable, hydration-safe pseudo-review count derived from the product id. */
export function reviewCount(product: Pick<Product, "id" | "reviews">): number {
  if (typeof product.reviews === "number") return product.reviews;
  return 480 + ((product.id * 137) % 2200);
}

/** Product type / format, inferred from the name when not set explicitly. */
export function productType(product: Pick<Product, "name" | "category" | "type">): string {
  if (product.type) return product.type;
  const n = product.name.toLowerCase();
  if (n.includes("facial kit") || n.includes("facial") ) return "Facial Kit";
  if (n.includes("d-tan") || n.includes("de-tan")) return "De-Tan Pack";
  if (n.includes("scrub")) return "Scrub";
  if (n.includes("exfoliant")) return "Exfoliant";
  if (n.includes("primer")) return "Primer";
  if (n.includes("foundation")) return "Foundation";
  if (n.includes("lipstick")) return "Lipstick";
  if (n.includes("shampoo")) return "Shampoo";
  if (n.includes("mask")) return "Hair Mask";
  if (n.includes("cream") || n.includes("moistur")) return "Moisturizer";
  if (n.includes("serum")) return "Serum";
  if (n.includes("combo") || n.includes("set")) return "Gift Set";
  return product.category || "Beauty";
}

/** Skin types a product suits, inferred from its copy when not set. */
export function skinTypesFor(
  product: Pick<Product, "name" | "description" | "ingredients" | "skinTypes">
): string[] {
  if (product.skinTypes && product.skinTypes.length) return product.skinTypes;
  const text = `${product.name} ${product.description ?? ""} ${product.ingredients ?? ""}`.toLowerCase();
  const out = new Set<string>();
  if (/(dry|hydrat|moistur|nourish|hyaluronic)/.test(text)) out.add("Dry");
  if (/(oil|acne|sebum|pore|blemish|clay|salicylic|tea tree)/.test(text)) out.add("Oily");
  if (/(sensitiv|sooth|aloe|chamomile|gentle|barrier)/.test(text)) out.add("Sensitive");
  if (/(combination|balance|niacinamide)/.test(text)) out.add("Combination");
  // Everything is safe for normal skin; guarantee at least two options.
  out.add("Normal");
  if (out.size < 2) out.add("Combination");
  return [...out];
}

/** Whether the item is purchasable. Defaults to in-stock unless flagged. */
export function inStock(product: Pick<Product, "inStock">): boolean {
  return product.inStock !== false;
}

const BADGE = (p: Pick<Product, "badge">) => (p.badge ?? "").toLowerCase();

export function isBestSeller(p: Pick<Product, "badge" | "bestSeller" | "rating">): boolean {
  if (typeof p.bestSeller === "boolean") return p.bestSeller;
  return ["bestseller", "popular", "value pack"].includes(BADGE(p)) || p.rating >= 5;
}

export function isNewArrival(p: Pick<Product, "badge" | "newArrival">): boolean {
  if (typeof p.newArrival === "boolean") return p.newArrival;
  return ["new", "featured"].includes(BADGE(p));
}

export function isFeatured(p: Pick<Product, "badge" | "featured" | "rating">): boolean {
  if (typeof p.featured === "boolean") return p.featured;
  return ["bestseller", "bridal", "luxury", "premium", "featured"].includes(BADGE(p)) || p.rating >= 5;
}

/* ═══════════════════════════════════════════════════════════════ */
/*  Category display + normalization                                 */
/* ═══════════════════════════════════════════════════════════════ */

const normalize = (s: string) => s.toLowerCase().replace(/[\s-]+/g, "");

/** Match a product against a display category, tolerant of spacing/case. */
export function matchesCategory(product: Pick<Product, "category">, category: string): boolean {
  if (!category || category === "All") return true;
  const target = normalize(category);
  const prod = normalize(product.category || "");
  // "Skin Care" ⇢ "skincare" etc.
  return prod === target || prod.includes(target) || target.includes(prod);
}

/* ═══════════════════════════════════════════════════════════════ */
/*  Facets — derived from the actual product list                    */
/* ═══════════════════════════════════════════════════════════════ */

export const SKIN_TYPE_OPTIONS = ["Dry", "Oily", "Combination", "Sensitive", "Normal"];

export interface Facets {
  categories: string[];
  types: string[];
  skinTypes: string[];
  priceMin: number;
  priceMax: number;
}

export function buildFacets(products: Product[]): Facets {
  const categories = new Set<string>();
  const types = new Set<string>();
  const skinTypes = new Set<string>();
  let priceMin = Infinity;
  let priceMax = 0;

  for (const p of products) {
    if (p.category) categories.add(p.category);
    types.add(productType(p));
    skinTypesFor(p).forEach((s) => skinTypes.add(s));
    const price = parsePrice(p.price);
    if (price > 0) {
      priceMin = Math.min(priceMin, price);
      priceMax = Math.max(priceMax, price);
    }
  }

  const floor = Number.isFinite(priceMin) ? Math.floor(priceMin / 50) * 50 : 0;
  const ceil = Math.ceil(priceMax / 100) * 100 || 5000;

  return {
    categories: [...categories].sort(),
    types: [...types].sort(),
    skinTypes: SKIN_TYPE_OPTIONS.filter((s) => skinTypes.has(s)),
    priceMin: floor,
    priceMax: ceil,
  };
}

/* ═══════════════════════════════════════════════════════════════ */
/*  Filtering + sorting                                              */
/* ═══════════════════════════════════════════════════════════════ */

export interface ProductFilters {
  search: string;
  categories: string[];
  types: string[];
  skinTypes: string[];
  priceRange: [number, number];
  minRating: number;
  availability: "all" | "in" | "out";
}

export type SortOption =
  | "featured"
  | "best-selling"
  | "new"
  | "price-asc"
  | "price-desc"
  | "rating-desc";

export const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured",
  "best-selling": "Best Selling",
  new: "New Arrivals",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "rating-desc": "Highest Rated",
};

export const defaultFilters = (facets: Facets): ProductFilters => ({
  search: "",
  categories: [],
  types: [],
  skinTypes: [],
  priceRange: [facets.priceMin, facets.priceMax],
  minRating: 0,
  availability: "all",
});

export function filterProducts(products: Product[], f: ProductFilters): Product[] {
  const q = f.search.trim().toLowerCase();

  return products.filter((p) => {
    if (q) {
      const haystack = `${p.name} ${p.category} ${p.description ?? ""} ${p.ingredients ?? ""} ${productType(p)}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (f.categories.length && !f.categories.some((c) => matchesCategory(p, c))) return false;
    if (f.types.length && !f.types.includes(productType(p))) return false;
    if (f.skinTypes.length) {
      const st = skinTypesFor(p);
      if (!f.skinTypes.some((s) => st.includes(s))) return false;
    }
    const price = parsePrice(p.price);
    if (price < f.priceRange[0] || price > f.priceRange[1]) return false;
    if (f.minRating && p.rating < f.minRating) return false;
    if (f.availability === "in" && !inStock(p)) return false;
    if (f.availability === "out" && inStock(p)) return false;
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    case "price-desc":
      return list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    case "rating-desc":
      return list.sort((a, b) => b.rating - a.rating || reviewCount(b) - reviewCount(a));
    case "best-selling":
      return list.sort((a, b) => reviewCount(b) - reviewCount(a));
    case "new":
      return list.sort((a, b) => Number(isNewArrival(b)) - Number(isNewArrival(a)) || b.id - a.id);
    case "featured":
    default:
      return list.sort((a, b) => Number(isFeatured(b)) - Number(isFeatured(a)) || a.id - b.id);
  }
}

export function countActiveFilters(f: ProductFilters, facets: Facets): number {
  let n = 0;
  n += f.categories.length;
  n += f.types.length;
  n += f.skinTypes.length;
  if (f.minRating) n += 1;
  if (f.availability !== "all") n += 1;
  if (f.priceRange[0] !== facets.priceMin || f.priceRange[1] !== facets.priceMax) n += 1;
  return n;
}

/* ═══════════════════════════════════════════════════════════════ */
/*  Cart helper (fires the app-wide custom event the Navbar listens  */
/*  to). Keeps every card/quick-view consistent.                     */
/* ═══════════════════════════════════════════════════════════════ */

export function addToCart(product: Product, quantity = 1) {
  if (typeof window === "undefined") return;
  useCartStore.getState().addItem({
    id: product.id,
    name: product.name,
    size: "Standard",
    price: parsePrice(product.price),
    quantity,
    image: product.image,
  });
  useUiStore.getState().openDrawer("cart");
}
