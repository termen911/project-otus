import type { CategoryFilters } from "../types";

export const categoryQueryKeys = {
  all: ['categories'] as const,

  lists: () => [...categoryQueryKeys.all, 'list'] as const,
  list: (filters: CategoryFilters) => [...categoryQueryKeys.lists(), filters] as const,

  details: () => [...categoryQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryQueryKeys.details(), id] as const,
};
