import type { MetadataRoute } from "next";
import { getCatalogProducts } from "@/lib/server/products";
import { products as staticProducts } from "@/data/beautyData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.zivabeauty.co.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dbProducts = await getCatalogProducts();
  const productsList = dbProducts.length > 0 ? dbProducts : staticProducts;
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/products`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/skincare`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/hair-care`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/makeup`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/returns`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  const productMap = new Map();
  productsList.forEach((p) => {
    productMap.set(p.id, {
      url: `${SITE_URL}/product/${p.id}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    });
  });

  return [...staticPages, ...Array.from(productMap.values())];
}
