import { useOperations } from '@/entities/operation';
import type { OperationFilters } from '@/entities/operation/model/types';

export const useInfiniteOperations = (filters?: Omit<OperationFilters, 'pagination'>) => {
  return useOperations({
    sorting: { field: 'createdAt', type: 'DESC' },
    pagination: { pageSize: 10 },
    ...filters,
  });
};
