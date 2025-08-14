export interface DecodedToken {
  exp?: number;
  userId?: string;
  email?: string;
  iat?: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    if (!token || typeof token !== 'string') return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    console.warn('Ошибка декодирования токена:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;

  const bufferTime = 30 * 1000;
  return Date.now() >= decoded.exp * 1000 - bufferTime;
};

export const isValidTokenFormat = (token: string): boolean => {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  return parts.length === 3;
};
