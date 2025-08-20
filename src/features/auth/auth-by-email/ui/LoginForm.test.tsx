import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LoginForm } from './LoginForm';

// Моки для зависимостей
const mockNavigate = vi.fn();
const mockLogin = vi.fn();
const mockSetToken = vi.fn();
const mockMessageSuccess = vi.fn();
const mockQueryClientClear = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../api/useLogin', () => ({
  useLogin: () => ({
    mutate: mockLogin,
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
        'login.title': 'Вход в систему',
        'login.email.label': 'Email',
        'login.email.placeholder': 'Введите email',
        'login.email.required': 'Email обязателен',
        'login.email.invalid': 'Неверный формат email',
        'login.password.label': 'Пароль',
        'login.password.placeholder': 'Введите пароль',
        'login.password.required': 'Пароль обязателен',
        'login.password.minLength': 'Пароль должен содержать минимум 6 символов',
        'login.submit': 'Войти',
        'login.submitLoading': 'Вход...',
        'login.success': 'Успешный вход!',
        'login.signupDescription': 'Нет аккаунта?',
        'login.links.signup': 'Зарегистрироваться',
      };
      return translations[key] || key;
    },
  }),
}));

vi.mock('@/shared/lib/errors/handleApiError', () => ({
  handleApiError: vi.fn(() => []),
}));

// Мок для Ant Design App
vi.mock('antd', async () => {
  const actual = await vi.importActual('antd');
  return {
    ...actual,
    App: {
      ...(actual.App as object),
      useApp: () => ({
        message: {
          success: mockMessageSuccess,
          error: vi.fn(),
        },
      }),
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

describe('LoginForm', () => {
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
          <LoginForm />
        </TestWrapper>
      );

      expect(screen.getByText('Вход в систему')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument();
      expect(screen.getByText('Нет аккаунта?')).toBeInTheDocument();
      expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument();
    });

    it('должен устанавливать автофокус на поле email', () => {
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText('Email');
      expect(emailInput).toHaveFocus();
    });

    it('должен отображать плейсхолдеры для полей ввода', () => {
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      expect(screen.getByPlaceholderText('Введите email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Введите пароль')).toBeInTheDocument();
    });
  });

  describe('Валидация формы', () => {
    it('должен показывать ошибку при пустом email', async () => {
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const submitButton = screen.getByRole('button', { name: 'Войти' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email обязателен')).toBeInTheDocument();
      });
    });

    it('должен показывать ошибку при неверном формате email', async () => {
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const emailInput = screen.getByTestId('email-input');
      const submitButton = screen.getByRole('button', { name: 'Войти' });

      await user.type(emailInput, 'invalid-email');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Неверный формат email')).toBeInTheDocument();
      });
    });

    it('должен показывать ошибку при пустом пароле', async () => {
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const emailInput = screen.getByTestId('email-input');
      const submitButton = screen.getByRole('button', { name: 'Войти' });

      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Пароль обязателен')).toBeInTheDocument();
      });
    });

    it('должен показывать ошибку при коротком пароле', async () => {
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const submitButton = screen.getByRole('button', { name: 'Войти' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, '123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Пароль должен содержать минимум 6 символов')).toBeInTheDocument();
      });
    });
  });

  describe('Отправка формы', () => {
    it('должен вызывать login с правильными данными', async () => {
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const submitButton = screen.getByRole('button', { name: 'Войти' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(
          {
            email: 'test@example.com',
            password: 'password123',
          },
          expect.any(Object)
        );
      });
    });

    it('должен обрабатывать успешный логин', async () => {
      // Переопределяем мок для этого теста
      const mockLoginSuccess = vi.fn((_, options) => {
        options.onSuccess();
      });

      vi.mocked(mockLogin).mockImplementation(mockLoginSuccess);

      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const submitButton = screen.getByRole('button', { name: 'Войти' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockMessageSuccess).toHaveBeenCalledWith('Успешный вход!');
        expect(mockQueryClientClear).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/profile');
      });
    });

    it('должен обрабатывать ошибки с полями', async () => {
      // Получаем мок функции handleApiError, которая уже замокана в начале файла
      const { handleApiError } = await import('@/shared/lib/errors/handleApiError');
      const mockHandleApiError = vi.mocked(handleApiError);

      // Настраиваем мок для возврата ошибок полей
      mockHandleApiError.mockReturnValue([
        { fieldName: 'email', message: 'Пользователь не найден' },
        { fieldName: 'password', message: 'Неверный пароль' },
      ]);

      const mockLoginError = vi.fn((_, options) => {
        options.onError(new Error('API Error'));
      });

      vi.mocked(mockLogin).mockImplementation(mockLoginError);

      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const submitButton = screen.getByRole('button', { name: 'Войти' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'wrongpassword');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockHandleApiError).toHaveBeenCalled();
        // Проверяем, что ошибки отображаются в форме
        expect(screen.getByText('Пользователь не найден')).toBeInTheDocument();
        expect(screen.getByText('Неверный пароль')).toBeInTheDocument();
      });
    });
  });

  describe('Навигация', () => {
    it('должен переходить на страницу регистрации при клике на ссылку', async () => {
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const signupLink = screen.getByText('Зарегистрироваться');
      await user.click(signupLink);

      expect(mockNavigate).toHaveBeenCalledWith('/auth/signup');
    });
  });

  describe('Доступность', () => {
    it('должен поддерживать навигацию с клавиатуры', async () => {
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const submitButton = screen.getByRole('button', { name: 'Войти' });

      // Email уже имеет автофокус, поэтому проверяем переход к паролю
      expect(emailInput).toHaveFocus();

      await user.tab();
      expect(passwordInput).toHaveFocus();

      await user.tab();
      expect(submitButton).toHaveFocus();
    });

    it('должен позволять отправку формы через Enter', async () => {
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      // Используем user.keyboard для более реалистичного нажатия Enter
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(
          {
            email: 'test@example.com',
            password: 'password123',
          },
          expect.any(Object)
        );
      });
    });
  });

  describe('Интеграционные тесты', () => {
    it('должен выполнять полный цикл входа пользователя', async () => {
      const mockLoginSuccess = vi.fn((_, options) => {
        // Симулируем успешный ответ от API
        setTimeout(() => options.onSuccess(), 100);
      });

      vi.mocked(mockLogin).mockImplementation(mockLoginSuccess);

      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      // Заполняем форму
      await user.type(screen.getByLabelText('Email'), 'user@example.com');
      await user.type(screen.getByLabelText('Пароль'), 'securepassword');

      // Отправляем форму
      await user.click(screen.getByRole('button', { name: 'Войти' }));

      // Проверяем вызов API
      expect(mockLogin).toHaveBeenCalledWith(
        {
          email: 'user@example.com',
          password: 'securepassword',
        },
        expect.any(Object)
      );

      // Ждем завершения асинхронных операций
      await waitFor(() => {
        expect(mockMessageSuccess).toHaveBeenCalledWith('Успешный вход!');
        expect(mockQueryClientClear).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/profile');
      });
    });


  });
});
