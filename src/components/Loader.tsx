"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 300);
    };

    if (document.readyState === "complete") {
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    } else {
      window.addEventListener("load", handleLoad);
      const backupTimer = setTimeout(() => setLoading(false), 800);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(backupTimer);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0D0D0D]"
        >
          <div className="relative flex flex-col items-center gap-6">
            {/* Logo Text Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl font-light tracking-[0.4em] text-white font-serif select-none"
            >
              ZIVA
            </motion.h1>

            {/* Glowing Accent Subtitle */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
              className="h-[1px] bg-gradient-to-r from-transparent via-[#C9A961] to-transparent"
            />

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-[9px] uppercase tracking-[0.3em] text-[#C9A961] font-medium font-sans"
            >
              Maison de Beauté
            </motion.span>
          </div>

          {/* Golden Spinner Circle */}
          <div className="absolute bottom-16 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-6 h-6 border-[1.5px] border-t-[#C9A961] border-r-transparent border-b-transparent border-l-transparent rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
