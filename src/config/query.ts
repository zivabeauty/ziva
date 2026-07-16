/** TanStack Query defaults shared across the app. */
export const queryConfig = {
  staleTime: 60 * 1000,
  gcTime: 5 * 60 * 1000,
  retry: 2,
  retryDelay: (attempt: number) => Math.min(1000 * 2 ** attempt, 10_000),
  refetchOnWindowFocus: false,
} as const;
