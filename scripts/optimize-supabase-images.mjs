/**
 * One-off migration: recompress existing Supabase product images to WebP.
 *
 * NON-DESTRUCTIVE: original objects are left in place; new .webp copies are
 * uploaded and the product rows are repointed to them. Fully reversible by
 * restoring the old URLs.
 *
 *   node scripts/optimize-supabase-images.mjs           # dry run (no writes)
 *   node scripts/optimize-supabase-images.mjs --apply   # perform the migration
 */
import { readFileSync } from "node:fs";
import sharp from "sharp";

const APPLY = process.argv.includes("--apply");
const BUCKET = "product-images";

// ── Load env from .env.local ──
const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, "")];
    })
);
const URL_BASE = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_BASE || !KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in .env.local");
  process.exit(1);
}
const rest = (q, init = {}) =>
  fetch(`${URL_BASE}/rest/v1/${q}`, {
    ...init,
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json", ...init.headers },
  });

const isConvertible = (u) =>
  typeof u === "string" && u.includes(".supabase.co/") && /\.(png|jpe?g)$/i.test(u.split("?")[0]);

async function convert(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${res.status}`);
  const inputBytes = Buffer.from(await res.arrayBuffer());
  const webp = await sharp(inputBytes)
    .rotate()
    .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();
  const base = url.split("/").pop().replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, "-").slice(0, 40);
  const path = `products/${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${base}.webp`;
  if (APPLY) {
    const up = await fetch(`${URL_BASE}/storage/v1/object/${BUCKET}/${path}`, {
      method: "POST",
      headers: {
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
      body: new Uint8Array(webp),
    });
    if (!up.ok) throw new Error(`upload ${up.status}: ${await up.text()}`);
  }
  return {
    newUrl: `${URL_BASE}/storage/v1/object/public/${BUCKET}/${path}`,
    before: inputBytes.length,
    after: webp.length,
  };
}

async function main() {
  console.log(APPLY ? "▶ APPLYING migration\n" : "▶ DRY RUN (no writes) — pass --apply to execute\n");
  const products = await (await rest("product?select=id,image,hoverImage,gallery")).json();

  const cache = new Map(); // originalUrl -> newUrl
  let converted = 0, savedBytes = 0, failed = 0;

  const mapUrl = async (u) => {
    if (!isConvertible(u)) return u;
    if (cache.has(u)) return cache.get(u);
    try {
      const { newUrl, before, after } = await convert(u);
      cache.set(u, newUrl);
      converted++;
      savedBytes += before - after;
      console.log(`  ✓ ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB  ${u.split("/").pop()}`);
      return newUrl;
    } catch (e) {
      failed++;
      console.log(`  ✗ ${u.split("/").pop()} — ${e.message} (kept original)`);
      return u;
    }
  };

  for (const p of products) {
    const image = await mapUrl(p.image);
    const hoverImage = await mapUrl(p.hoverImage);
    const gallery = Array.isArray(p.gallery) ? await Promise.all(p.gallery.map(mapUrl)) : p.gallery;

    const changed = image !== p.image || hoverImage !== p.hoverImage || JSON.stringify(gallery) !== JSON.stringify(p.gallery);
    if (changed && APPLY) {
      const patch = await rest(`product?id=eq.${p.id}`, {
        method: "PATCH",
        body: JSON.stringify({ image, hoverImage, gallery }),
      });
      if (!patch.ok) console.log(`  ! row ${p.id} update failed: ${await patch.text()}`);
    }
  }

  console.log(
    `\nDone. images converted: ${converted}, failed: ${failed}, storage saved: ${(savedBytes / 1024 / 1024).toFixed(1)} MB`
  );
  if (!APPLY) console.log("Re-run with --apply to write the changes.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
