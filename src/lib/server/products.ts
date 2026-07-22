import "server-only";
import type { Product } from "@/data/beautyData";
import { supabaseAdmin, isSupabaseServerConfigured } from "@/lib/server/supabase-admin";

// Listing columns only — omits the heavy `gallery` jsonb and `usage` (used by
// the product-detail page, not the grid). Keeps `description`/`ingredients`
// because the /products search + skin-type filters read them.
const LIST_COLUMNS =
  "id,name,category,price,oldPrice,rating,badge,image,hoverImage,description,sizes,ingredients";

/** Server-side catalog — Supabase only (no static/dummy fallback). Cached. */
export async function getCatalogProducts(): Promise<Product[]> {
  if (!isSupabaseServerConfigured()) return [];

  try {
    const res = await supabaseAdmin(`product?select=${LIST_COLUMNS}&order=id.asc`, {
      // Cache the catalog for 5 minutes so most requests are served from the
      // Next data cache instead of re-hitting Supabase on every page load.
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as Product[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  if (!isSupabaseServerConfigured()) return null;

  try {
    // Detail page needs everything (gallery, usage, …). Cached 5 min.
    const res = await supabaseAdmin(`product?id=eq.${id}&select=*&limit=1`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Product[];
    return Array.isArray(data) && data[0] ? data[0] : null;
  } catch {
    return null;
  }
}
