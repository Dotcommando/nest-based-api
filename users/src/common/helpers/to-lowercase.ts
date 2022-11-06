import { TransformFnParams } from 'class-transformer';


export const toLowercase = (data: TransformFnParams) => data.value?.toLowerCase();
