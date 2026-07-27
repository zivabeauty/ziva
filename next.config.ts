import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";


const csp = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline' https://*.razorpay.com https://www.googletagmanager.com https://*.googletagmanager.com https://*.google-analytics.com${isDev ? " 'unsafe-eval'" : ""}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com https://*.razorpay.com https://www.googletagmanager.com https://*.google-analytics.com`,
  `font-src 'self' data:`,
  `connect-src 'self' https://*.supabase.co https://*.razorpay.com https://*.google-analytics.com https://*.googletagmanager.com https://*.analytics.google.com`,
  `frame-src https://*.razorpay.com`,
  `worker-src 'self' blob:`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'none'`,
  ...(isDev ? [] : [`upgrade-insecure-requests`]),
].join("; ");

const nextConfig: NextConfig = {
  images: {
    // Product images uploaded from the admin live in Supabase Storage.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Serve modern formats and cache optimized variants for a week.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },

  // sharp is a native module used by the admin upload route — keep it external
  // so Next doesn't try to bundle it.
  serverExternalPackages: ["sharp"],

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp,
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
