import Link from "next/link";

/** Branded 404 page. */
export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FAF7F2] px-6 text-center">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#79443B]">
        404 — Page not found
      </p>
      <h1 className="font-serif text-3xl text-[#3D2412] sm:text-4xl">
        This page has been discontinued
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-[#3D2412]/60">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Explore
        the collection instead.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="bg-[#3D2412] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF7F2] transition-opacity hover:opacity-90"
        >
          Go Home
        </Link>
        <Link
          href="/products"
          className="border border-[#3D2412] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#3D2412] transition-colors hover:bg-[#3D2412] hover:text-[#FAF7F2]"
        >
          Shop All
        </Link>
      </div>
    </div>
  );
}
