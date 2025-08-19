import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CategoryFilters, CreateCategoryParams, UpdateCategoryParams } from '../types';
import { categoryApi } from './categoryApi';
import { categoryQueryKeys } from './queryKeys';

export const useCategories = (filters: CategoryFilters = {}) => {
  return useQuery({
    queryKey: categoryQueryKeys.list(filters),
    queryFn: () => categoryApi.fetchCategories(filters).then((res) => res.data),
  });
};

export const useCategoryById = (id: string) => {
  return useQuery({
    queryKey: categoryQueryKeys.detail(id),
    queryFn: () => categoryApi.fetchCategoryById(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryParams) =>
      categoryApi.createCategory(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryParams }) =>
      categoryApi.updateCategory(id, data).then((res) => res.data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.detail(id) });
    },
  });
};

export const usePatchCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UpdateCategoryParams> }) =>
      categoryApi.patchCategory(id, data).then((res) => res.data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.detail(id) });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
    },
  });
};
