import { QueryClient } from "@tanstack/react-query";
import { queryConfig } from "@/config/query";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: queryConfig.staleTime,
        gcTime: queryConfig.gcTime,
        retry: queryConfig.retry,
        retryDelay: queryConfig.retryDelay,
        refetchOnWindowFocus: queryConfig.refetchOnWindowFocus,
      },
      mutations: {
        retry: 1,
      },
    },
  });
}
