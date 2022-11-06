export function toBoolean({ value }: { value: unknown }): boolean {
  return value === true || value === 'true' || value === 1;
}
