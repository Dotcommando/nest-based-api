import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Response } from 'express';

import { Observable, tap } from 'rxjs';

import { IResponse } from '../common/types';


@Injectable()
export class StatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response: Response = context.switchToHttp().getResponse();

    return next
      .handle()
      .pipe(
        tap((res: IResponse<unknown>) => response.statusCode = res.status),
      );
  }
}
