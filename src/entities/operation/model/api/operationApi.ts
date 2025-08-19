import { axiosInstance } from '@/shared/lib/axios';
import { buildQueryParams } from '../../lib/buildQueryParams';
import type {
  CreateOperationParams,
  Operation,
  OperationFilters,
  OperationListResponse,
  PartialUpdateOperationParams,
  UpdateOperationParams,
} from '../types';

const OPERATION_ENDPOINT = '/operations';

export const operationApi = {
  /**
   * Получение списка операций с фильтрацией
   */
  fetchOperations: (filters: OperationFilters = {}) => {
    const params = buildQueryParams(filters);
    return axiosInstance.get<OperationListResponse>(OPERATION_ENDPOINT, { params });
  },

  /**
   * Получение операции по ID
   */
  fetchOperationById: (id: string) => {
    return axiosInstance.get<Operation>(`${OPERATION_ENDPOINT}/${id}`);
  },

  /**
   * Создание новой операции
   */
  createOperation: (data: CreateOperationParams) => {
    return axiosInstance.post<Operation>(OPERATION_ENDPOINT, data);
  },

  /**
   * Полное обновление операции (PUT)
   */
  updateOperation: (id: string, data: UpdateOperationParams) => {
    return axiosInstance.put<Operation>(`${OPERATION_ENDPOINT}/${id}`, data);
  },

  /**
   * Частичное обновление операции (PATCH)
   */
  patchOperation: (id: string, data: PartialUpdateOperationParams) => {
    return axiosInstance.patch<Operation>(`${OPERATION_ENDPOINT}/${id}`, data);
  },

  /**
   * Удаление операции
   */
  deleteOperation: (id: string) => {
    return axiosInstance.delete<void>(`${OPERATION_ENDPOINT}/${id}`);
  },
};
