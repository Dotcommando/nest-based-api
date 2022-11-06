export function AddressedErrorCatching() {
  return function(
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    if (!target['_markedMethods']?.length) {
      target['_markedMethods'] = [];
    }

    target['_markedMethods'].push(key);

    return descriptor;
  };
}
