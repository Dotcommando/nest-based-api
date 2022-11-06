import { TransformFnParams } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';


export const sanitizeString = (params: TransformFnParams) => sanitizeHtml(params.value);

export const sanitizeStringIfNotNull = (params: TransformFnParams) => params.value === null
  ? null
  : sanitizeHtml(params.value);
