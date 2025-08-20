import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RegisterForm } from './RegisterForm';

// Моки для зависимостей
const mockNavigate = vi.fn();
const mockRegister = vi.fn();
const mockSetToken = vi.fn();
const mockQueryClientClear = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../api/useRegister', () => ({
  useRegister: () => ({
    mutate: mockRegister,
    isPending: false,
  }),
}));

vi.mock('@/entities/session', () => ({
  useSessionStore: () => ({
    setToken: mockSetToken,
  }),
}));

vi.mock('@/app/providers/i18n/useAppTranslation', () => ({
  useAppTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'register.title': 'Регистрация',
        'register.label': 'ID команды',
        'register.email.label': 'Email',
        'register.email.placeholder': 'Введите email',
        'register.email.required': 'Email обязателен',
        'register.email.invalid': 'Неверный формат email',
        'register.password.label': 'Пароль',
        'register.password.placeholder': 'Введите пароль',
        'register.password.required': 'Пароль обязателен',
        'register.password.minLength': 'Пароль должен содержать минимум 6 символов',
        'register.confirmPassword.label': 'Подтвердите пароль',
        'register.confirmPassword.placeholder': 'Подтвердите пароль',
        'register.confirmPassword.required': 'Подтверждение пароля обязательно',
        'register.confirmPassword.mismatch': 'Пароли не совпадают',
        'register.submit': 'Зарегистрироваться',
        'register.submitLoading': 'Регистрация...',
        'register.success': 'Успешная регистрация!',
        'register.signinDescription': 'Уже есть аккаунт?',
        'register.links.signin': 'Войти',
      };
      return translations[key] || key;
    },
  }),
}));

vi.mock('@/shared/lib/errors/handleApiError', () => ({
  handleApiError: vi.fn(() => []),
}));

// Мок для Ant Design message
vi.mock('antd', async () => {
  const actual = await vi.importActual('antd');
  return {
    ...actual,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

// Компонент-обертка для тестирования
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  queryClient.clear = mockQueryClientClear;

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe('RegisterForm', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Рендеринг компонента', () => {
    it('должен отображать все основные элементы формы', () => {
      render(
        <TestWrapper>
          <RegisterForm />
        </TestWrapper>
      );

      expect(screen.getByText('Регистрация')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
      expect(screen.getByLabelText('Подтвердите пароль')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Зарегистрироваться' })).toBeInTheDocument();
      expect(screen.getByText('Уже есть аккаунт?')).toBeInTheDocument();
      expect(screen.getByText('Войти')).toBeInTheDocument();
    });

    it('должен устанавливать автофокус на поле email', () => {
      render(
        <TestWrapper>
          <RegisterForm />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText('Email');
      expect(emailInput).toHaveFocus();
    });

    it('должен иметь скрытое поле commandId со значением по умолчанию', () => {
      render(
        <TestWrapper>
          <RegisterForm />
        </TestWrapper>
      );

      const commandIdInput = screen.getByDisplayValue('1234567890');
      expect(commandIdInput).toBeInTheDocument();
      expect(commandIdInput).toBeDisabled();
    });
  });

  describe('Валидация формы', () => {
    it('должен показывать ошибку при пустом email', async () => {
      render(
        <TestWrapper>
          <RegisterForm />
        </TestWrapper>
      );

      const submitButton = screen.getByRole('button', { name: 'Зарегистрироваться' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email обязателен')).toBeInTheDocument();
      });
    });

    it('должен показывать ошибку при неверном формате email', async () => {
      render(
        <TestWrapper>
          <RegisterForm />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText('Email');
      const submitButton = screen.getByRole('button', { name: 'Зарегистрироваться' });

      await user.type(emailInput, 'invalid-email');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Неверный формат email')).toBeInTheDocument();
      });
    });

    it('должен показывать ошибку при пустом пароле', async () => {
      render(
        <TestWrapper>
          <RegisterForm />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText('Email');
      const submitButton = screen.getByRole('button', { name: 'Зарегистрироваться' });

      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Пароль обязателен')).toBeInTheDocument();
      });
    });

    it('должен показывать ошибку при коротком пароле', async () => {
      render(
        <TestWrapper>
          <RegisterForm />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Пароль');
      const submitButton = screen.getByRole('button', { name: 'Зарегистрироваться' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, '123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Пароль должен содержать минимум 6 символов')).toBeInTheDocument();
      });
    });

    it('должен показывать ошибку при пустом подтверждении пароля', async () => {
      render(
        <TestWrapper>
          <RegisterForm />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Пароль');
      const submitButton = screen.getByRole('button', { name: 'Зарегистрироваться' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Подтверждение пароля обязательно')).toBeInTheDocument();
      });
    });

    it('должен показывать ошибку при несовпадении паролей', async () => {
      render(
        <TestWrapper>
          <RegisterForm />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Пароль');
      const confirmPasswordInput = screen.getByLabelText('Подтвердите пароль');
      const submitButton = screen.getByRole('button', { name: 'Зарегистрироваться' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.type(confirmPasswordInput, 'differentpassword');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Пароли не совпадают')).toBeInTheDocument();
      });
    });
  });

  describe('Отправка формы', () => {
    it('должен вызывать register с правильными данными', async () => {
      render(
        <TestWrapper>
          <RegisterForm />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Пароль');
      const confirmPasswordInput = screen.getByLabelText('Подтвердите пароль');
      const submitButton = screen.getByRole('button', { name: 'Зарегистрироваться' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.type(confirmPasswordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockRegister).toHaveBeenCalledWith(
          {
            email: 'test@example.com',
            password: 'password123',
            confirmPassword: 'password123',
            commandId: '1234567890',
          },
          expect.any(Object)
        );
      });
    });

    it('должен обрабатывать успешную регистрацию', async () => {
      // Переопределяем мок для этого теста
      const mockRegisterSuccess = vi.fn((_, options) => {
        options.onSuccess();
      });

      vi.mocked(mockRegister).mockImplementation(mockRegisterSuccess);

      render(
        <TestWrapper>
          <RegisterForm />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Пароль');
      const confirmPasswordInput = screen.getByLabelText('Подтвердите пароль');
      const submitButton = screen.getByRole('button', { name: 'Зарегистрироваться' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.type(confirmPasswordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/profile');
      });
    });

    it('должен обрабатывать ошибки с полями', async () => {
      // Получаем мок функции handleApiError, которая уже замокана в начале файла
      const { handleApiError } = await import('@/shared/lib/errors/handleApiError');
      const mockHandleApiError = vi.mocked(handleApiError);

      // Настраиваем мок для возврата ошибок полей
      mockHandleApiError.mockReturnValue([
        { fieldName: 'email', message: 'Email уже используется' },
        { fieldName: 'password', message: 'Пароль слишком простой' },
      ]);

      const mockRegisterError = vi.fn((_, options) => {
        options.onError(new Error('API Error'));
      });

      vi.mocked(mockRegister).mockImplementation(mockRegisterError);

      render(
        <TestWrapper>
          <RegisterForm />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Пароль');
      const confirmPasswordInput = screen.getByLabelText('Подтвердите пароль');
      const submitButton = screen.getByRole('button', { name: 'Зарегистрироваться' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.type(confirmPasswordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockHandleApiError).toHaveBeenCalled();
        // Проверяем, что ошибки отображаются в форме
        expect(screen.getByText('Email уже используется')).toBeInTheDocument();
        expect(screen.getByText('Пароль слишком простой')).toBeInTheDocument();
      });
    });
  });

  describe('Навигация', () => {
    it('должен переходить на страницу входа при клике на ссылку', async () => {
      render(
        <TestWrapper>
          <RegisterForm />
        </TestWrapper>
      );

      const signinLink = screen.getByText('Войти');
      await user.click(signinLink);

      expect(mockNavigate).toHaveBeenCalledWith('/auth/signin');
    });
  });

  describe('Доступность', () => {
    it('должен поддерживать навигацию с клавиатуры', async () => {
      render(
        <TestWrapper>
          <RegisterForm />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Пароль');
      const confirmPasswordInput = screen.getByLabelText('Подтвердите пароль');
      const submitButton = screen.getByRole('button', { name: 'Зарегистрироваться' });

      // Email уже имеет автофокус, поэтому проверяем переход к паролю
      expect(emailInput).toHaveFocus();

      await user.tab();
      expect(passwordInput).toHaveFocus();

      await user.tab();
      expect(confirmPasswordInput).toHaveFocus();

      await user.tab();
      expect(submitButton).toHaveFocus();
    });
  });

  describe('Интеграционные тесты', () => {
    it('должен выполнять полный цикл регистрации пользователя', async () => {
      const mockRegisterSuccess = vi.fn((_, options) => {
        // Симулируем успешный ответ от API
        setTimeout(() => options.onSuccess(), 100);
      });

      vi.mocked(mockRegister).mockImplementation(mockRegisterSuccess);

      render(
        <TestWrapper>
          <RegisterForm />
        </TestWrapper>
      );

      // Заполняем форму
      await user.type(screen.getByLabelText('Email'), 'newuser@example.com');
      await user.type(screen.getByLabelText('Пароль'), 'securepassword');
      await user.type(screen.getByLabelText('Подтвердите пароль'), 'securepassword');

      // Отправляем форму
      await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }));

      // Проверяем вызов API
      expect(mockRegister).toHaveBeenCalledWith(
        {
          email: 'newuser@example.com',
          password: 'securepassword',
          confirmPassword: 'securepassword',
          commandId: '1234567890',
        },
        expect.any(Object)
      );

      // Ждем завершения асинхронных операций
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/profile');
      });
    });
  });
});
