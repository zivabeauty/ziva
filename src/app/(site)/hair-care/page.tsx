"use client";

import CategoryLanding from "@/components/pages/CategoryLanding";
import { hairCarePage } from "@/data/pageContent";

export default function HairCarePage() {
  return <CategoryLanding config={hairCarePage} />;
}
