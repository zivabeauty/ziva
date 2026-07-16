import { api } from "@/lib/api";
import type { AdminLoginPayload, AdminSession } from "@/features/auth/types/auth.types";

export const authApi = {
  session: () => api.get<AdminSession>("/admin/session"),
  login: (payload: AdminLoginPayload) => api.post<{ ok: boolean }>("/admin/login", payload),
  logout: () => api.post<{ ok: boolean }>("/admin/logout"),
};
