import { productsApi } from "@/features/products/api/products.api";

export const productsService = {
  getAll: async () => {
    const { data } = await productsApi.list();
    return data.data;
  },
  getById: async (id: number) => {
    const { data } = await productsApi.byId(id);
    return data.data;
  },
};
