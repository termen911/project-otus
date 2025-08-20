import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { OperationForm } from './OperationForm';

// Моки для зависимостей
const mockOnSubmit = vi.fn();
const mockOnCancel = vi.fn();
const mockCreateCategoryInForm = vi.fn();

const mockCategoriesOptions = [
  { label: 'Продукты', value: 'cat-1' },
  { label: 'Транспорт', value: 'cat-2' },
  { label: 'Развлечения', value: 'cat-3' },
];

vi.mock('@/app/providers/i18n/useAppTranslation', () => ({
  useAppTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'fields.name.label': 'Название',
        'fields.name.placeholder': 'Введите название операции',
        'fields.name.errors.required': 'Название обязательно',
        'fields.description.label': 'Описание',
        'fields.description.placeholder': 'Введите описание',
        'fields.amount.label': 'Сумма',
        'fields.amount.placeholder': 'Введите сумму',
        'fields.amount.errors.required': 'Сумма обязательна',
        'fields.date.label': 'Дата',
        'fields.date.placeholder': 'Выберите дату',
        'fields.date.errors.required': 'Дата обязательна',
        'fields.type.label': 'Тип операции',
        'fields.type.placeholder': 'Выберите тип',
        'fields.type.errors.required': 'Тип обязателен',
        'fields.type.options.profit': 'Доход',
        'fields.type.options.cost': 'Расход',
        'fields.category.label': 'Категория',
        'fields.category.placeholder': 'Выберите категорию',
        'fields.category.errors.required': 'Категория обязательна',
        'buttons.cancel': 'Отмена',
        'buttons.create': 'Создать',
        'buttons.save': 'Сохранить',
      };
      return translations[key] || key;
    },
  }),
}));

vi.mock('@/features/category-create-in-form', () => ({
  useCategorySelectData: () => ({
    options: mockCategoriesOptions,
    isLoading: false,
    isCreating: false,
    createCategory: mockCreateCategoryInForm,
  }),
  CategorySelectWithCreate: ({
    options,
    placeholder,
    value,
    onChange,
  }: {
    options: Array<{ label: string; value: string }>;
    placeholder: string;
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
  }) => (
    <>
      <select
        data-testid="category-select"
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  ),
}));

// Мок для Ant Design компонентов
vi.mock('antd', async () => {
  const actual = await vi.importActual('antd');
  return {
    ...actual,
    DatePicker: ({
      placeholder,
      onChange,
      value,
      ...props
    }: {
      placeholder?: string;
      onChange?: (value: string) => void;
      value?: string;
      [key: string]: unknown;
    }) => (
      <input
        data-testid="date-picker"
        type="datetime-local"
        placeholder={placeholder}
        value={value ? '2024-01-15T12:00' : ''}
        onChange={(e) => onChange?.(e.target.value)}
        {...props}
      />
    ),
    Select: ({
      placeholder,
      onChange,
      value,
      options,
      ...props
    }: {
      placeholder?: string;
      onChange?: (value: string) => void;
      value?: string;
      options?: Array<{ label: string; value: string }>;
      [key: string]: unknown;
    }) => (
      <select
        data-testid="type-select"
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ),
  };
});

describe('OperationForm', () => {
  const user = userEvent.setup();

  const mockOperation = {
    id: 'op-1',
    name: 'Покупка продуктов',
    desc: 'Еженедельная закупка',
    amount: 2500,
    type: 'Cost' as const,
    category: { id: 'cat-1', name: 'Продукты', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    date: '2024-01-15T12:00:00.000Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Рендеринг компонента', () => {
    it('должен отображать все основные поля формы', () => {
      render(<OperationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      expect(screen.getByText('Название')).toBeInTheDocument();
      expect(screen.getByText('Описание')).toBeInTheDocument();
      expect(screen.getByText('Сумма')).toBeInTheDocument();
      expect(screen.getByText('Дата')).toBeInTheDocument();
      expect(screen.getByText('Тип операции')).toBeInTheDocument();
      expect(screen.getByText('Категория')).toBeInTheDocument();
    });

    it('должен отображать кнопки управления', () => {
      render(<OperationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      expect(screen.getByRole('button', { name: 'Отмена' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Создать' })).toBeInTheDocument();
    });
  });

  describe('Режим создания', () => {
    it('должен отображать кнопку "Создать" в режиме создания', () => {
      render(<OperationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      expect(screen.getByRole('button', { name: 'Создать' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Сохранить' })).not.toBeInTheDocument();
    });
  });

  describe('Режим редактирования', () => {
    it('должен отображать кнопку "Сохранить" в режиме редактирования', () => {
      render(
        <OperationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} operation={mockOperation} />
      );

      expect(screen.getByRole('button', { name: 'Сохранить' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Создать' })).not.toBeInTheDocument();
    });

    it('должен заполнять поля данными операции', () => {
      render(
        <OperationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} operation={mockOperation} />
      );

      expect(screen.getByDisplayValue('Покупка продуктов')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Еженедельная закупка')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2500')).toBeInTheDocument();
    });

    it('должен выбирать правильную категорию', () => {
      render(
        <OperationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} operation={mockOperation} />
      );

      const categorySelect = screen.getByTestId('category-select');
      expect(categorySelect).toHaveValue('cat-1');
    });
  });

  describe('Валидация формы', () => {
    it('должен показывать ошибку при пустом названии', async () => {
      render(<OperationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const submitButton = screen.getByRole('button', { name: 'Создать' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Название обязательно')).toBeInTheDocument();
      });
    });

    it('должен показывать ошибку при пустой сумме', async () => {
      render(<OperationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const nameInput = screen.getByLabelText('Название');
      const submitButton = screen.getByRole('button', { name: 'Создать' });

      await user.type(nameInput, 'Тестовая операция');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Сумма обязательна')).toBeInTheDocument();
      });
    });

    it('должен показывать ошибку при пустой дате', async () => {
      render(<OperationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const nameInput = screen.getByLabelText('Название');
      const amountInput = screen.getByLabelText('Сумма');
      const submitButton = screen.getByRole('button', { name: 'Создать' });

      await user.type(nameInput, 'Тестовая операция');
      await user.type(amountInput, '1000');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Дата обязательна')).toBeInTheDocument();
      });
    });

    it('должен показывать ошибку при пустом типе', async () => {
      render(<OperationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const nameInput = screen.getByLabelText('Название');
      const amountInput = screen.getByLabelText('Сумма');
      const dateInput = screen.getByTestId('date-picker');
      const submitButton = screen.getByRole('button', { name: 'Создать' });

      await user.type(nameInput, 'Тестовая операция');
      await user.type(amountInput, '1000');
      await user.type(dateInput, '2024-01-15T12:00');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Тип обязателен')).toBeInTheDocument();
      });
    });

    it('должен показывать ошибку при пустой категории', async () => {
      render(<OperationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const nameInput = screen.getByLabelText('Название');
      const amountInput = screen.getByLabelText('Сумма');
      const dateInput = screen.getByTestId('date-picker');
      const typeSelect = screen.getByTestId('type-select');
      const submitButton = screen.getByRole('button', { name: 'Создать' });

      await user.type(nameInput, 'Тестовая операция');
      await user.type(amountInput, '1000');
      await user.type(dateInput, '2024-01-15T12:00');
      await user.selectOptions(typeSelect, 'Cost');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Категория обязательна')).toBeInTheDocument();
      });
    });
  });

  describe('Управление кнопками', () => {
    it('должен вызывать onCancel при клике на кнопку отмены', async () => {
      render(<OperationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const cancelButton = screen.getByRole('button', { name: 'Отмена' });
      await user.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalled();
    });
  });

  describe('Обработка ошибок и edge cases', () => {
    it('должен правильно обрабатывать пустые значения в режиме редактирования', () => {
      const operationWithEmptyFields = {
        ...mockOperation,
        desc: '', // Пустое описание
      };

      render(
        <OperationForm
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          operation={operationWithEmptyFields}
        />
      );

      // Проверяем, что пустое описание корректно отображается
      const descInput = screen.getByLabelText('Описание');
      expect(descInput).toHaveValue('');
    });

    it('должен корректно обрабатывать некорректные данные даты', () => {
      const operationWithInvalidDate = {
        ...mockOperation,
        date: 'invalid-date',
      };

      // Тест не должен падать при некорректной дате
      expect(() => {
        render(
          <OperationForm
            onSubmit={mockOnSubmit}
            onCancel={mockOnCancel}
            operation={operationWithInvalidDate}
          />
        );
      }).not.toThrow();
    });
  });
});
