import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy — an allowlist of where the browser may load
 * things from. Anything not listed is blocked, which stops attacker-hosted
 * scripts, clickjacking frames, and data exfiltration to unknown domains.
 *
 * Pragmatic tier: keeps 'unsafe-inline' so framer-motion / GSAP / Three.js
 * inline styles keep working. A stricter nonce-based CSP (via proxy.ts) is
 * a good post-launch upgrade. Razorpay uses *.razorpay.com for its script,
 * checkout iframe, and API calls — all allowlisted so payments don't break.
 */
const csp = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline' https://*.razorpay.com${isDev ? " 'unsafe-eval'" : ""}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com https://*.razorpay.com`,
  `font-src 'self' data:`,
  `connect-src 'self' https://*.supabase.co https://*.razorpay.com`,
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
  },

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
