import { HttpException } from '@nestjs/common';

import { AddressedHttpException } from '../exceptions';

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
