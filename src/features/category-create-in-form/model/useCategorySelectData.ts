import { useCategories, useCreateCategory } from '@/entities/category';

export const useCategorySelectData = () => {
  const { data: categories, isLoading: isLoadingCategories } = useCategories({
    sorting: { field: 'name', type: 'ASC' },
    pagination: { pageSize: 0 },
  });

  const { mutate: createCategory, isPending: isCreatingCategory } = useCreateCategory();

  const options =
    categories?.data.map((cat) => ({
      label: cat.name,
      value: cat.id,
    })) || [];

  return {
    options,
    isLoading: isLoadingCategories,
    isCreating: isCreatingCategory,
    createCategory: (name: string, onSuccess: (id: string) => void) => {
      createCategory(
        { name },
        {
          onSuccess: (newCategory) => onSuccess(newCategory.id),
        }
      );
    },
  };
};
