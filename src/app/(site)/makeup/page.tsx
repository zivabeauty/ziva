"use client";

import CategoryLanding from "@/components/pages/CategoryLanding";
import { makeupPage } from "@/data/pageContent";

export default function MakeupPage() {
  return <CategoryLanding config={makeupPage} />;
}
