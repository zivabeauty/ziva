"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { authService } from "@/features/auth/services/auth.service";
import type { AdminLoginPayload } from "@/features/auth/types/auth.types";

export function useAdminSession() {
  return useQuery({
    queryKey: queryKeys.admin.session,
    queryFn: () => authService.getSession(),
  });
}

export function useAdminLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: AdminLoginPayload) => authService.login(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.admin.session }),
  });
}

export function useAdminLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => qc.setQueryData(queryKeys.admin.session, { authenticated: false }),
  });
}
