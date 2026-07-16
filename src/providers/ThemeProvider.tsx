"use client";

import { type ReactNode } from "react";

/** Theme wrapper — reserved for future dark/light toggle via ui store. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
