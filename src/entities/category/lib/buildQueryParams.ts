import type { CategoryFilters } from '../model/types';

export const buildQueryParams = (filters: CategoryFilters): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.name !== undefined) {
    params.append('name', filters.name);
  }

  if (Array.isArray(filters.ids)) {
    filters.ids.forEach((id) => params.append('ids', String(id)));
  }

  const addSerialized = (key: string, obj: unknown) => {
    if (obj && Object.values(obj).some((v) => v !== undefined)) {
      params.append(key, JSON.stringify(obj));
    }
  };

  addSerialized('pagination', filters.pagination);
  addSerialized('sorting', filters.sorting);
  addSerialized('createdAt', filters.createdAt);
  addSerialized('updatedAt', filters.updatedAt);

  return params;
};
