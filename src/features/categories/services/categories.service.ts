import { categoriesApi } from "@/features/categories/api/categories.api";

export const categoriesService = {
  getAll: async () => {
    const { data } = await categoriesApi.list();
    return data.data;
  },
};
