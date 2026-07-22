import { NextResponse } from "next/server";
import { categories as staticCategories } from "@/data/beautyData";
import { getCatalogProducts } from "@/lib/server/products";

export const revalidate = 300;

export async function GET() {
  const products = await getCatalogProducts();
  const categoryMap = new Map<string, number>();

  for (const p of products) {
    if (p.category) {
      categoryMap.set(p.category, (categoryMap.get(p.category) ?? 0) + 1);
    }
  }

  const derived = [...categoryMap.entries()].map(([name, count]) => ({
    name,
    count: `${count} Product${count === 1 ? "" : "s"}`,
    image: products.find((p) => p.category === name)?.image ?? "",
    href: `/products?category=${encodeURIComponent(name)}`,
  }));

  const data = derived.length > 0 ? derived : staticCategories;
  return NextResponse.json({ data });
}

