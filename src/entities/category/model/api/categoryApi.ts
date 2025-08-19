import { axiosInstance } from '@/shared/lib/axios';
import { buildQueryParams } from '../../lib/buildQueryParams';
import type {
  Category,
  CategoryFilters,
  CategoryListResponse,
  CreateCategoryParams,
  UpdateCategoryParams,
} from '../types';

const CATEGORY_ENDPOINT = '/categories';

export const categoryApi = {
  fetchCategories: async (filters: CategoryFilters = {}) => {
    const params = buildQueryParams(filters);
    return axiosInstance.get<CategoryListResponse>(CATEGORY_ENDPOINT, { params });
  },

  fetchCategoryById: (id: string) => {
    return axiosInstance.get<Category>(`${CATEGORY_ENDPOINT}/${id}`);
  },

  createCategory: (data: CreateCategoryParams) => {
    return axiosInstance.post<Category>(CATEGORY_ENDPOINT, data);
  },

  updateCategory: (id: string, data: UpdateCategoryParams) => {
    return axiosInstance.put<Category>(`${CATEGORY_ENDPOINT}/${id}`, data);
  },

  patchCategory: (id: string, data: Partial<UpdateCategoryParams>) => {
    return axiosInstance.patch<Category>(`${CATEGORY_ENDPOINT}/${id}`, data);
  },

  deleteCategory: (id: string) => {
    return axiosInstance.delete<void>(`${CATEGORY_ENDPOINT}/${id}`);
  },
};
