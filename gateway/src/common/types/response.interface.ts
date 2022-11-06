import { HttpStatus } from '@nestjs/common';

export interface IResponse<TData = { [key: string]: unknown }> {
  status: number | HttpStatus;
  data: TData | null;
  errors: string[] | null;
}
