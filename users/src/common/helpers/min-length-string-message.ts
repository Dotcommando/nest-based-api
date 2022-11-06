export const minLengthStringMessage = (fieldName: string, minLength: number) => `${fieldName} must be equal or longer than ${minLength === 1 ? '1 symbol' : minLength + ' symbols'}`;
