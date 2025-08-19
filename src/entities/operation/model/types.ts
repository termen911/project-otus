import type { Category } from "@/entities/category";

export type Operation = {
  id: string;
  name: string;
  desc?: string;
  amount: number;
  date: string; // ISO string
  type: 'Profit' | 'Cost';
  category: Category;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};

export type OperationFilters = {
  ids?: string[];
  name?: string;
  categoryIds?: string[];
  type?: 'Cost' | 'Profit';
  pagination?: {
    pageSize?: number;
    pageNumber?: number;
  };
  date?: {
    gte?: string;
    lte?: string;
  };
  createdAt?: {
    gte?: string;
    lte?: string;
  };
  updatedAt?: {
    gte?: string;
    lte?: string;
  };
  sorting?: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date';
  };
};

export type OperationListResponse = {
  data: Operation[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
  sorting: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date';
  };
};

export type CreateOperationParams = {
  name: string;
  desc?: string;
  amount: number;
  date: string;
  type: 'Profit' | 'Cost';
  categoryId: string;
};

export type UpdateOperationParams = CreateOperationParams;

export type PartialUpdateOperationParams = Partial<UpdateOperationParams>;
