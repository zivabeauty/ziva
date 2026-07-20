"use client";

import { useState } from "react";
import Link from "next/link";
import { RefreshCw, PackageCheck, ArrowLeftRight, Check, Loader2 } from "lucide-react";

type RequestType = "return" | "exchange";

export default function ReturnsPage() {
  const [type, setType] = useState<RequestType>("return");
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/returns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, email, type, reason }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  };

  return (
    <div className="bg-white text-ink">
      {/* Header */}
      <section className="relative overflow-hidden bg-porcelain/50">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(70% 60% at 50% 0%, rgba(226,185,157,0.22), transparent 62%)" }}
        />
        <div className="relative mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-gold-deep ring-1 ring-ink/5 shadow-sm">
            <RefreshCw className="h-3.5 w-3.5" /> Returns &amp; Exchanges
          </span>
          <h1 className="font-serif text-3xl font-medium tracking-[-0.02em] text-ink sm:text-[2.5rem]">
            Easy Returns &amp; Exchanges
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed text-ink/60">
            Not quite right? Request a return or exchange within 30 days of delivery. Tell us your
            order details below and our team will take it from there.
          </p>
        </div>
      </section>

      {/* Form / success */}
      <section className="mx-auto max-w-xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {status === "done" ? (
          <div className="rounded-[28px] border border-ink/5 bg-white p-10 text-center shadow-[0_12px_40px_rgba(61,36,18,0.08)]">
            <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft text-gold-deep">
              <PackageCheck className="h-6 w-6" />
            </span>
            <h2 className="font-serif text-2xl text-ink">Request received</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm font-light leading-relaxed text-ink/60">
              Thanks — your {type} request for order{" "}
              <span className="font-semibold text-ink">{orderId}</span> has been submitted. We&apos;ll
              email you the next steps shortly.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 bg-ink px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-gold-deep"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="rounded-[28px] border border-ink/5 bg-white p-7 shadow-[0_12px_40px_rgba(61,36,18,0.07)] sm:p-9"
          >
            {/* Type toggle */}
            <div className="mb-6 grid grid-cols-2 gap-3">
              {([
                { key: "return", label: "Return", icon: RefreshCw },
                { key: "exchange", label: "Exchange", icon: ArrowLeftRight },
              ] as const).map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setType(key)}
                  className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${
                    type === key
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/15 bg-white text-ink/60 hover:border-ink/40"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-ink/50">
                  Order ID
                </label>
                <input
                  type="text"
                  required
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. order_ABC123 (from your confirmation email)"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-3 text-sm text-ink transition-colors focus:border-gold-deep focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-ink/50">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="The email used at checkout"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-3 text-sm text-ink transition-colors focus:border-gold-deep focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-ink/50">
                  Reason {type === "exchange" ? "& preferred item" : "for return"}
                </label>
                <textarea
                  required
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={
                    type === "exchange"
                      ? "Tell us what you'd like to exchange it for and why."
                      : "Let us know why you're returning the item."
                  }
                  className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-3 text-sm text-ink transition-colors focus:border-gold-deep focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-[13px] font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-7 flex w-full items-center justify-center gap-2 bg-ink py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-gold-deep disabled:opacity-60"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              Submit {type === "exchange" ? "Exchange" : "Return"} Request
            </button>

            <p className="mt-5 text-center text-[12px] font-light text-ink/45">
              Need help finding your order?{" "}
              <Link href="/contact" className="font-semibold text-gold-deep hover:underline">
                Contact support
              </Link>
            </p>
          </form>
        )}
      </section>
    </div>
  );
}
