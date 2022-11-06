import { createAddressedException } from '../helpers';

export function ApplyAddressedErrorCatching<T extends { new(...args: any[]): {}}>(target: T) {
  return class extends target {
    __className: string = target.name;
    __methodName: string;

    constructor(...args) {
      super(...args);

      const methods = target.prototype._markedMethods;

      for (const methodName in methods) {
        const oldFunction = target.prototype[methods[methodName]].bind(this);

        if (oldFunction.constructor.name === 'AsyncFunction') {
          target.prototype[methods[methodName]] = async (...args) => {
            try {
              this.__methodName = methods[methodName];

              return await oldFunction(...args);
            } catch (e) {
              createAddressedException(e, `${ this.__className } >> ${ this.__methodName }`);
            }
          };
        } else {
          target.prototype[methods[methodName]] = (...args) => {
            try {
              this.__methodName = methods[methodName];

              return oldFunction(...args);
            } catch (e) {
              createAddressedException(e, `${ this.__className } >> ${ this.__methodName }`);
            }
          };
        }
      }
    }
  };
}
