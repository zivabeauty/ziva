export type { Product } from "@/data/beautyData";

export interface ProductsResponse {
  data: import("@/data/beautyData").Product[];
  total: number;
}

export interface ProductResponse {
  data: import("@/data/beautyData").Product;
}
