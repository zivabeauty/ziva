import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.zivabeauty.co.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/products", "/product/", "/skincare", "/hair-care", "/makeup", "/about", "/contact", "/returns"],
      disallow: [
        "/cart",
        "/checkout",
        "/account",
        "/login",
        "/register",
        "/wishlist",
        "/thank-you",
        "/order-success",
        "/search",
        "/api/",
        "/admin/",
        // Filter out tracking query params while keeping product URLs crawlable
        "/*?utm_",
        "/*?gclid=",
        "/*?fbclid=",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
