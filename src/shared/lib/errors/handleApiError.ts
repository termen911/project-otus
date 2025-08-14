import { message } from 'antd';
import ERROR_MESSAGES from './errorMessages';
import { type ServerErrors, ErrorCode } from './types';
import { getErrorMessage } from './getErrorMessage';

type FieldError = {
  fieldName?: string;
  message: string;
};

export const handleApiError = (error: unknown): FieldError[] => {
  const fieldErrors: FieldError[] = [];
  const serverErrors = (error as { response?: { data: ServerErrors } })?.response?.data;
  if (!serverErrors?.errors?.length) {
    const errorMessage = ERROR_MESSAGES[ErrorCode.ERR_INTERNAL_SERVER];
    const finalMessage = typeof errorMessage === 'function' ? errorMessage() : errorMessage;
    message.error(finalMessage);
    return [];
  }
  serverErrors.errors.forEach((err) => {
    const { code } = err.extensions;
    const fieldName = err.fieldName;
    let userMessage = ERROR_MESSAGES[code as ErrorCode];

    if (typeof userMessage === 'function') {
      userMessage = userMessage(fieldName);
    } else if (typeof userMessage !== 'string') {
      userMessage = getErrorMessage(code as ErrorCode);
    }

    if (!fieldName) {
      message.error(userMessage);
    } else {
      fieldErrors.push({ fieldName, message: userMessage });
    }
  });

  return fieldErrors;
};
