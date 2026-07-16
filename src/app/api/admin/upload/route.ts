import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/session";

/**
 * Admin image upload → Supabase Storage (`product-images` bucket, public).
 * Accepts multipart form data with a `file` field and returns the public URL
 * to store on the product row.
 */

const BUCKET = "product-images";
const MAX_BYTES = 5 * 1024 * 1024; // matches the bucket's file_size_limit
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey =
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !secretKey) {
    return NextResponse.json(
      { error: "Storage is not configured — set SUPABASE_SECRET_KEY in .env.local." },
      { status: 503 }
    );
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP or AVIF images are allowed." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be 5 MB or smaller." }, { status: 400 });
  }

  // Unique, URL-safe object path — never trust the original filename.
  const base = file.name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, "-").slice(0, 40) || "image";
  const path = `products/${Date.now()}-${base}.${ext}`;

  try {
    const res = await fetch(`${supabaseUrl}/storage/v1/object/${BUCKET}/${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        apikey: secretKey,
        "Content-Type": file.type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
      body: file,
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Storage upload failed:", detail);
      return NextResponse.json(
        { error: "Upload failed — check that the 'product-images' bucket exists." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      url: `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${path}`,
    });
  } catch (err) {
    console.error("Storage upload error:", err);
    return NextResponse.json({ error: "Could not reach Supabase Storage." }, { status: 500 });
  }
}
