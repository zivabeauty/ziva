import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.zivabeauty.co.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        // Private & utility pages
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
        // Faceted / tracking URL parameters (avoid duplicate-content crawling)
        "/*?q=",
        "/*?search=",
        "/*?sort=",
        "/*?filter=",
        "/*?page=",
        "/*?price=",
        "/*?color=",
        "/*?size=",
        "/*?variant=",
        "/*?utm_",
        "/*?gclid=",
        "/*?fbclid=",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
