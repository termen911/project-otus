import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  CreateOperationParams,
  OperationFilters,
  PartialUpdateOperationParams,
  UpdateOperationParams,
} from '../types';
import { operationApi } from './operationApi';
import { operationQueryKeys } from './queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useOperations = (filters: OperationFilters = {}) => {
  return useInfiniteQuery({
    queryKey: operationQueryKeys.list(filters),
    queryFn: ({ pageParam = 1 }) =>
      operationApi
        .fetchOperations({ ...filters, pagination: { pageNumber: pageParam, pageSize: 10 } })
        .then((res) => res.data),
    getNextPageParam: (lastPage, pages) => {
      const totalFetched = pages.length * 10;
      return totalFetched < lastPage.pagination.total ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useOperationById = (id: string) => {
  return useQuery({
    queryKey: operationQueryKeys.detail(id),
    queryFn: () => operationApi.fetchOperationById(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useCreateOperation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOperationParams) =>
      operationApi.createOperation(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: operationQueryKeys.lists() });
    },
  });
};

export const useUpdateOperation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOperationParams }) =>
      operationApi.updateOperation(id, data).then((res) => res.data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: operationQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: operationQueryKeys.detail(id) });
    },
  });
};

export const usePatchOperation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PartialUpdateOperationParams }) =>
      operationApi.patchOperation(id, data).then((res) => res.data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: operationQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: operationQueryKeys.detail(id) });
    },
  });
};

export const useDeleteOperation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => operationApi.deleteOperation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: operationQueryKeys.lists() });
    },
  });
};
