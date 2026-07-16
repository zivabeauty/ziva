"use client";

import { type ReactNode } from "react";
import { Toaster } from "@/components/common/Toaster";

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
