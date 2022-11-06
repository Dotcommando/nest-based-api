import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

import { ErrorResponse } from '../classes';
import { getExceptionsMessages } from '../helpers';


@Catch()
export class TcpCommonExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception?.getStatus && typeof exception.getStatus === 'function'
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    return new ErrorResponse(status, getExceptionsMessages(exception));
  }
}
