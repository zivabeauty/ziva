import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/session";
import { supabaseAdmin } from "@/lib/server/supabase-admin";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function sanitizeProduct(body: Record<string, unknown>) {
  const id = Number(body.id);
  const name = String(body.name ?? "").trim();
  const price = String(body.price ?? "").trim();
  if (!Number.isInteger(id) || id <= 0) return { error: "A positive numeric id is required." };
  if (!name) return { error: "Name is required." };
  if (!price) return { error: "Price is required." };

  return {
    product: {
      id,
      name,
      category: String(body.category ?? "Skincare"),
      price,
      oldPrice: body.oldPrice ? String(body.oldPrice) : null,
      rating: Math.min(5, Math.max(1, Number(body.rating) || 5)),
      badge: body.badge ? String(body.badge) : null,
      image: String(body.image ?? ""),
      hoverImage: String(body.hoverImage || body.image || ""),
      description: String(body.description ?? ""),
      sizes: Array.isArray(body.sizes) ? body.sizes.map(String) : [],
      ingredients: body.ingredients ? String(body.ingredients) : null,
      usage: body.usage ? String(body.usage) : null,
    },
  };
}

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  try {
    const res = await supabaseAdmin("product?select=*&order=id.asc");
    if (!res.ok) return NextResponse.json({ error: await res.text() }, { status: res.status });
    return NextResponse.json(await res.json());
  } catch (err) {
    console.error("Admin products fetch failed:", err);
    return NextResponse.json({ error: "Failed to load products." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) return unauthorized();
  const body = await request.json().catch(() => ({}));
  const result = sanitizeProduct(body);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });

  try {
    const res = await supabaseAdmin("product", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(result.product),
    });
    if (!res.ok) return NextResponse.json({ error: await res.text() }, { status: res.status });
    return NextResponse.json(await res.json());
  } catch (err) {
    console.error("Admin product create failed:", err);
    return NextResponse.json({ error: "Failed to create product." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) return unauthorized();
  const body = await request.json().catch(() => ({}));
  const result = sanitizeProduct(body);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });

  try {
    const res = await supabaseAdmin(`product?id=eq.${result.product.id}`, {
      method: "PATCH",
      body: JSON.stringify(result.product),
    });
    if (!res.ok) return NextResponse.json({ error: await res.text() }, { status: res.status });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Admin product update failed:", err);
    return NextResponse.json({ error: "Failed to update product." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) return unauthorized();
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "A numeric id query param is required." }, { status: 400 });
  }

  try {
    const res = await supabaseAdmin(`product?id=eq.${id}`, { method: "DELETE" });
    if (!res.ok) return NextResponse.json({ error: await res.text() }, { status: res.status });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Admin product delete failed:", err);
    return NextResponse.json({ error: "Failed to delete product." }, { status: 500 });
  }
}
