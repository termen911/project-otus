import i18n from '@/app/config/i18n';
import { ErrorCode } from './types';

export const getErrorMessage = (code: ErrorCode, field?: string): string => {
  const t = i18n.t;

  switch (code) {
    case ErrorCode.ERR_FIELD_REQUIRED:
      return field
        ? t('serverError.ERR_FIELD_REQUIRED', { field })
        : t('serverError.ERR_FIELD_REQUIRED_DEFAULT');

    case ErrorCode.ERR_INCORRECT_EMAIL_OR_PASSWORD:
      return t('serverError.ERR_INCORRECT_EMAIL_OR_PASSWORD');

    case ErrorCode.ERR_ACCOUNT_ALREADY_EXIST:
      return t('serverError.ERR_ACCOUNT_ALREADY_EXIST');

    case ErrorCode.ERR_INCORRECT_PASSWORD:
      return t('serverError.ERR_INCORRECT_PASSWORD');

    case ErrorCode.ERR_INVALID_PASSWORD:
      return t('serverError.ERR_INVALID_PASSWORD');

    case ErrorCode.ERR_NOT_VALID:
      return t('serverError.ERR_NOT_VALID');

    case ErrorCode.ERR_AUTH:
      return t('serverError.ERR_AUTH');

    case ErrorCode.ERR_NO_FILES:
      return t('serverError.ERR_NO_FILES');

    case ErrorCode.ERR_NOT_ALLOWED:
      return t('serverError.ERR_NOT_ALLOWED');

    case ErrorCode.ERR_NOT_FOUND:
      return t('serverError.ERR_NOT_FOUND');

    case ErrorCode.ERR_VALIDATION_ERROR:
      return t('serverError.ERR_VALIDATION_ERROR');

    case ErrorCode.ERR_INVALID_QUERY_PARAMS:
      return t('serverError.ERR_INVALID_QUERY_PARAMS');

    case ErrorCode.ERR_INTERNAL_SERVER:
      return t('serverError.ERR_INTERNAL_SERVER');

    default:
      return t('serverError.DEFAULT_ERROR');
  }
};
