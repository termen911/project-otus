import type { OperationFilters } from '../model';

export const buildQueryParams = (filters: OperationFilters): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.name !== undefined) {
    params.append('name', filters.name);
  }

  if (Array.isArray(filters.ids) && filters.ids.length > 0) {
    filters.ids.forEach((id) => params.append('ids', String(id)));
  }

  if (Array.isArray(filters.categoryIds) && filters.categoryIds.length > 0) {
    filters.categoryIds.forEach((id) => params.append('categoryIds', String(id)));
  }

  if (filters.type !== undefined) {
    params.append('type', filters.type);
  }

  const addSerialized = (key: string, obj: unknown) => {
    if (obj && Object.values(obj).some((v) => v !== undefined)) {
      params.append(key, JSON.stringify(obj));
    }
  };

  addSerialized('pagination', filters.pagination);
  addSerialized('sorting', filters.sorting);
  addSerialized('date', filters.date);
  addSerialized('createdAt', filters.createdAt);
  addSerialized('updatedAt', filters.updatedAt);

  return params;
};
