import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

import { Response } from 'express';

import { ErrorResponse } from '../classes';
import { AddressedHttpException } from '../exceptions';


@Catch()
export class HttpCommonExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception?.getStatus && typeof exception.getStatus === 'function'
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const context = host.switchToHttp();
    const response: Response = context.getResponse();
    const errorResponse = new ErrorResponse(status, getExceptionsMessages(exception));

    response
      .status(status)
      .send({ ...errorResponse });
  }
}

export function getExceptionsMessages(exception: HttpException | Error): string[] {
  const errorMessages = [];

  if (exception instanceof HttpException) {
    const response = exception?.getResponse();

    errorMessages.push(
      typeof response === 'string'
        ? response as string
        : typeof response === 'object' && (response as HttpException)?.message
          ? (response as HttpException).message
          : JSON.stringify(response),
    );

    if (exception instanceof AddressedHttpException) {
      errorMessages.push('Error address: ' + exception.getErrorAddress());
    }
  } else {
    if (exception?.message && typeof exception.message === 'string') {
      errorMessages.push(exception.message);
    }
  }

  return errorMessages.flat();
}
