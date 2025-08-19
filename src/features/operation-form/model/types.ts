export type OperationEditFormValues = {
  name: string;
  desc?: string;
  amount: number;
  date: string;
  type: 'Profit' | 'Cost';
  categoryId: string;
};
