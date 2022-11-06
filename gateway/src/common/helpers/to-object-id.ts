import { BadRequestException } from '@nestjs/common';

import ObjectId from 'bson-objectid';
import { TransformFnParams } from 'class-transformer';


export function toObjectIdFn({ value, key }: { [key: string]: string }): ObjectId {
  if (!ObjectId.isValid(value) || String(value) !== value) {
    throw new BadRequestException(`${key} is not a valid ObjectId`);
  }

  return new ObjectId(value);
}

export const toObjectId: (data: TransformFnParams) => ObjectId = (data: TransformFnParams) =>
  toObjectIdFn({ value: data.value, key: data.key });

