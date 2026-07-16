import "server-only";

/**
 * Tiny in-memory rate limiter. Tracks failed attempts per key (e.g. an IP)
 * inside a Map. Good enough to blunt brute-force on a single-server store;
 * swap for a shared store (e.g. Upstash Redis) when running multiple
 * instances or serverless, where each instance has its own memory.
 */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000; // 15-minute lockout window
const MAX_FAILURES = 5; // allowed failures before lockout

/** Read-only check: is this key currently locked out? */
export function isRateLimited(key: string): { limited: boolean; retryAfter: number } {
  const bucket = buckets.get(key);
  if (!bucket || Date.now() > bucket.resetAt) return { limited: false, retryAfter: 0 };
  if (bucket.count >= MAX_FAILURES) {
    return { limited: true, retryAfter: Math.ceil((bucket.resetAt - Date.now()) / 1000) };
  }
  return { limited: false, retryAfter: 0 };
}

/** Call after a FAILED attempt to increment the counter. */
export function recordFailure(key: string): void {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    bucket.count++;
  }
}

/** Call after a SUCCESSFUL login to clear the counter. */
export function clearFailures(key: string): void {
  buckets.delete(key);
}
