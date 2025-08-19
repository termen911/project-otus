export type Category = {
  id: string;
  name: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoryFilters = {
  name?: string;
  ids?: string[];
  pagination?: {
    pageSize?: number;
    pageNumber?: number;
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

export type CategoryListResponse = {
  data: Category[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
  sorting: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name';
  };
};

export type CreateCategoryParams = {
  name: string;
  photo?: string;
};

export type UpdateCategoryParams = {
  name: string;
  photo?: string;
};
