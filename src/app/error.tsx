"use client";

import { useEffect } from "react";
import Link from "next/link";

/** App-wide error boundary — a branded recovery screen instead of a crash. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FAF7F2] px-6 text-center">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#79443B]">
        Something went wrong
      </p>
      <h1 className="font-serif text-3xl text-[#3D2412] sm:text-4xl">
        We hit a small snag
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-[#3D2412]/60">
        An unexpected error occurred. Your bag and wishlist are safe — please try again.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          onClick={reset}
          className="bg-[#3D2412] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF7F2] transition-opacity hover:opacity-90"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border border-[#3D2412] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#3D2412] transition-colors hover:bg-[#3D2412] hover:text-[#FAF7F2]"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
