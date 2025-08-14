import { getErrorMessage } from './getErrorMessage';
import { ErrorCode } from './types';

const ERROR_MESSAGES: Record<ErrorCode, string | ((field?: string) => string)> = {
  [ErrorCode.ERR_INCORRECT_EMAIL_OR_PASSWORD]: () =>
    getErrorMessage(ErrorCode.ERR_INCORRECT_EMAIL_OR_PASSWORD),
  [ErrorCode.ERR_ACCOUNT_ALREADY_EXIST]: () => getErrorMessage(ErrorCode.ERR_ACCOUNT_ALREADY_EXIST),
  [ErrorCode.ERR_FIELD_REQUIRED]: (field) => getErrorMessage(ErrorCode.ERR_FIELD_REQUIRED, field),
  [ErrorCode.ERR_INCORRECT_PASSWORD]: () => getErrorMessage(ErrorCode.ERR_INCORRECT_PASSWORD),
  [ErrorCode.ERR_INVALID_PASSWORD]: () => getErrorMessage(ErrorCode.ERR_INVALID_PASSWORD),
  [ErrorCode.ERR_NOT_VALID]: () => getErrorMessage(ErrorCode.ERR_NOT_VALID),
  [ErrorCode.ERR_AUTH]: () => getErrorMessage(ErrorCode.ERR_AUTH),
  [ErrorCode.ERR_NO_FILES]: () => getErrorMessage(ErrorCode.ERR_NO_FILES),
  [ErrorCode.ERR_NOT_ALLOWED]: () => getErrorMessage(ErrorCode.ERR_NOT_ALLOWED),
  [ErrorCode.ERR_NOT_FOUND]: () => getErrorMessage(ErrorCode.ERR_NOT_FOUND),
  [ErrorCode.ERR_VALIDATION_ERROR]: () => getErrorMessage(ErrorCode.ERR_VALIDATION_ERROR),
  [ErrorCode.ERR_INVALID_QUERY_PARAMS]: () => getErrorMessage(ErrorCode.ERR_INVALID_QUERY_PARAMS),
  [ErrorCode.ERR_INTERNAL_SERVER]: () => getErrorMessage(ErrorCode.ERR_INTERNAL_SERVER),

};

export default ERROR_MESSAGES;
