"use client";

import CategoryLanding from "@/components/pages/CategoryLanding";
import { skincarePage } from "@/data/pageContent";

export default function SkincarePage() {
  return <CategoryLanding config={skincarePage} />;
}
