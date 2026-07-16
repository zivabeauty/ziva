import "server-only";

/**
 * Server-side Supabase REST access. Prefers a server key that bypasses RLS
 * — either the new-style `sb_secret_...` key or the legacy `service_role`
 * JWT — and falls back to the public key when neither is set, so the app
 * keeps working before RLS is configured.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVER_KEY =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

export function isSupabaseServerConfigured() {
  return Boolean(SUPABASE_URL && SERVER_KEY);
}

export async function supabaseAdmin(
  query: string,
  init: RequestInit = {}
): Promise<Response> {
  if (!isSupabaseServerConfigured()) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and a key in .env.local."
    );
  }

  return fetch(`${SUPABASE_URL}/rest/v1/${query}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      apikey: SERVER_KEY,
      Authorization: `Bearer ${SERVER_KEY}`,
      ...init.headers,
    },
    cache: "no-store",
  });
}
