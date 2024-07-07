import { StatusEnum } from '../enums/response.enum';
import { IResponseData } from '../types/transform.types';
import _get from 'lodash/get';

export function transformResponse<T>({
  data = null,
  status,
  errorMessage = '',
  errorMessageCode = '',
}: IResponseData<T>) {
  return {
    status,
    data,
    errorMessage,
    errorMessageCode,
  };
}

export function transformResponseErrors(error: unknown) {
  const success = false;
  const data = _get(error, 'response.data.data', null);
  const status = Number(_get(error, 'response.data.status', StatusEnum.INTERNAL_SERVER_ERROR));
  const statusText = _get(
    error,
    'response.data.statusText',
    'An error occurred. Please try again!',
  );
  const errorMessageCode = _get(error, 'response.data.errorMessageCode', 'EXH_ERR_002');
  const errorMessage = _get(
    error,
    'response.data.errorMessage',
    'An error occurred. Please try again!',
  );
  const resultErrors = {
    success,
    data,
    status,
    statusText,
    errorMessage,
    errorMessageCode,
  };
  return resultErrors;
}
