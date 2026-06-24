import type { PaginatedResponse } from "@/types/marketplace";

export function normalizePaginatedResponse<T>(
  data: PaginatedResponse<T> | T[],
): PaginatedResponse<T> {
  if (Array.isArray(data)) {
    return {
      count: data.length,
      next: null,
      previous: null,
      results: data,
    };
  }

  return data;
}
