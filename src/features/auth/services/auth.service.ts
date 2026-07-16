import { authApi } from "@/features/auth/api/auth.api";
import type { AdminLoginPayload } from "@/features/auth/types/auth.types";

export const authService = {
  getSession: async () => {
    const { data } = await authApi.session();
    return data;
  },
  login: async (payload: AdminLoginPayload) => {
    const { data } = await authApi.login(payload);
    return data;
  },
  logout: async () => {
    const { data } = await authApi.logout();
    return data;
  },
};
