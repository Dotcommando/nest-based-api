import { OBJECT_ID_REGEXP } from '../constants';

export function isValidObjectId(data: any): boolean {
  if (typeof data === 'string') {
    return OBJECT_ID_REGEXP.test(data);
  }

  return OBJECT_ID_REGEXP.test(String(data));
}
