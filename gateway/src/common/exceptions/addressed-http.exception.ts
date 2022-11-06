import { HttpException } from '@nestjs/common';

export class AddressedHttpException extends HttpException {
  constructor(public statusCode: number, public errorAddress: string, public errorMessage: string) {
    super(errorMessage, statusCode);
  }

  getErrorAddress(): string {
    return this.errorAddress;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }

  getStatusCode(): number {
    return this.statusCode;
  }
}
