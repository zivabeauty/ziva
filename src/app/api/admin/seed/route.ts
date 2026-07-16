import { NextResponse } from "next/server";
import { products as staticProducts } from "@/data/beautyData";
import { requireAdmin } from "@/lib/server/session";
import { supabaseAdmin } from "@/lib/server/supabase-admin";

/** Upserts the bundled catalog into the Supabase product table (admin only). */
export async function POST() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Only send real table columns (beautyData carries extra UI fields like desc/gallery).
  const rows = staticProducts.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    oldPrice: p.oldPrice ?? null,
    rating: p.rating ?? 5,
    badge: p.badge || null,
    image: p.image,
    hoverImage: p.hoverImage || p.image,
    description: p.description,
    sizes: p.sizes ?? [],
    ingredients: p.ingredients ?? null,
    usage: p.usage ?? null,
  }));

  try {
    const res = await supabaseAdmin("product?on_conflict=id", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify(rows),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Seed failed:", detail);
      return NextResponse.json(
        { error: "Seed failed — has supabase/schema.sql been run?", detail },
        { status: res.status }
      );
    }
    return NextResponse.json({ ok: true, count: rows.length });
  } catch (err) {
    console.error("Seed failed:", err);
    return NextResponse.json({ error: "Could not reach Supabase." }, { status: 500 });
  }
}
