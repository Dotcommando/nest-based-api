import { HttpException, HttpStatus } from '@nestjs/common';

import { AddressedHttpException } from '../exceptions';


export function createAddressedException(
  e: Error | HttpException | AddressedHttpException,
  address: string,
): AddressedHttpException {
  throw new AddressedHttpException(
    (e as HttpException)?.getStatus
      ? (e as HttpException).getStatus()
      : e?.message?.includes('E11000')
        ? HttpStatus.CONFLICT
        : HttpStatus.PRECONDITION_FAILED,
    address,
    process.env.ENVIRONMENT === 'prod'
      ? 'Some internal error happened'
      : e?.message && typeof e.message === 'string'
        ? e.message
        : String(e),
  );
}
