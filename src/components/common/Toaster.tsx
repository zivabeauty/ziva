"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useToastStore } from "@/store/toast.store";

const variantStyles = {
  success: "border-gold/40 bg-cream text-ink",
  error: "border-red-200 bg-red-50 text-red-800",
  info: "border-stone-200 bg-white text-ink",
};

export function Toaster() {
  const { toasts, dismiss } = useToastStore();

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            className={`pointer-events-auto flex min-w-[260px] max-w-sm items-start gap-3 border px-4 py-3 shadow-lg ${variantStyles[toast.variant]}`}
          >
            <p className="flex-1 text-xs font-medium leading-relaxed">{toast.message}</p>
            <button
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss"
              className="shrink-0 text-stone-400 hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
