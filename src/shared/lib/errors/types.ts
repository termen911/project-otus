export const ErrorCode = {
  ERR_INCORRECT_EMAIL_OR_PASSWORD: 'ERR_INCORRECT_EMAIL_OR_PASSWORD',
  ERR_ACCOUNT_ALREADY_EXIST: 'ERR_ACCOUNT_ALREADY_EXIST',
  ERR_FIELD_REQUIRED: 'ERR_FIELD_REQUIRED',
  ERR_INCORRECT_PASSWORD: 'ERR_INCORRECT_PASSWORD',
  ERR_INVALID_PASSWORD: 'ERR_INVALID_PASSWORD',
  ERR_NOT_VALID: 'ERR_NOT_VALID',
  ERR_AUTH: 'ERR_AUTH',
  ERR_NO_FILES: 'ERR_NO_FILES',
  ERR_NOT_ALLOWED: 'ERR_NOT_ALLOWED',
  ERR_NOT_FOUND: 'ERR_NOT_FOUND',
  ERR_VALIDATION_ERROR: 'ERR_VALIDATION_ERROR',
  ERR_INVALID_QUERY_PARAMS: 'ERR_INVALID_QUERY_PARAMS',
  ERR_INTERNAL_SERVER: 'ERR_INTERNAL_SERVER',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export type ServerErrors = {
  errors: {
    extensions: {
      code: ErrorCode;
    };
    name: string;
    fieldName?: string;
    stack: string;
    message: string;
  }[];
};
