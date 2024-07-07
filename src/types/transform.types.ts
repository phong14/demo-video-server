import { StatusEnum } from '../enums/response.enum';

export interface IResponseData<T> {
  data?: T | null;
  status: StatusEnum;
  errorMessage?: string;
  errorMessageCode?: string;
}
