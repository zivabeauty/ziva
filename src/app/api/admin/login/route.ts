import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { isRateLimited, recordFailure, clearFailures } from "@/lib/server/rate-limit";
import { ADMIN_COOKIE, createSessionToken } from "@/lib/server/session";

/** Constant-time password comparison (hash first so lengths always match). */
function passwordsMatch(supplied: string, expected: string): boolean {
  const a = createHash("sha256").update(supplied).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  // Identify the caller. Behind Vercel/proxies the real IP is the first
  // entry in x-forwarded-for. Falls back to a shared bucket if absent.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  // Refuse early if this IP has failed too many times recently.
  const { limited, retryAfter } = isRateLimited(ip);
  if (limited) {
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${Math.ceil(retryAfter / 60)} minute(s).` },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { error: "Admin login is not configured. Set ADMIN_PASSWORD in .env.local." },
      { status: 503 }
    );
  }

  let password = "";
  try {
    ({ password } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof password !== "string" || !passwordsMatch(password, adminPassword)) {
    recordFailure(ip); // Count this failure toward the lockout.
    // Small delay to blunt brute-force attempts.
    await new Promise((r) => setTimeout(r, 750));
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  clearFailures(ip); // Successful login — reset the counter for this IP.

  const { token, maxAge } = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
  return res;
}
