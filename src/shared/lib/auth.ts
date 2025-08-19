import i18n from "@/app/config/i18n";
import { isTokenExpired, isValidTokenFormat } from "./jwt";

export const validateToken = (token: string | null): {
  isValid: boolean;
  error: string | null;
} => {
  const t = i18n.t;
  if (!token) return { isValid: false, error: null };

  if (!isValidTokenFormat(token)) {
    return { isValid: false, error: t('validateToken.INVALID_TOKEN_FORMAT') };
  }

  if (isTokenExpired(token)) {
    return { isValid: false, error: t('validateToken.TOKEN_EXPIRED') };
  }

  return { isValid: true, error: null };
};
