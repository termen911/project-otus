import { isTokenExpired, isValidTokenFormat } from "./jwt";

export const validateToken = (token: string | null): {
  isValid: boolean;
  error: string | null;
} => {
  if (!token) return { isValid: false, error: null };

  if (!isValidTokenFormat(token)) {
    return { isValid: false, error: 'Неверный формат токена' };
  }

  if (isTokenExpired(token)) {
    return { isValid: false, error: 'Токен истек' };
  }

  return { isValid: true, error: null };
};
