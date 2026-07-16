/**
 * Lightweight Supabase REST client (browser-safe).
 *
 * Reads use the public key — either a legacy `anon` JWT or a new-style
 * `sb_publishable_...` key; both are safe to expose. Protect data with
 * Row Level Security policies in Supabase. All writes go through server
 * API routes (see app/api/**), never directly from the browser.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

/** GET rows from a table, e.g. supabaseSelect<Product>("product?select=*"). */
export async function supabaseSelect<T>(query: string): Promise<T[]> {
  if (!isSupabaseConfigured) return [];

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${query}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Supabase query failed (${res.status}): ${query}`);
  }
  return res.json();
}
