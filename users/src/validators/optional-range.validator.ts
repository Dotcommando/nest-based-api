export function optionalRange(minLength = 0, maxLength = Infinity) {
  return {
    validator: function(value: string): boolean {
      if (!value) {
        return true;
      }

      return value.length >= minLength && value.length <= maxLength;
    },
    message: props => {
      const fieldName = props.path.charAt(0).toUpperCase() + props.path.slice(1);
      if (typeof props.value !== 'string') {
        return 'Value is not a string type';
      } else if (props.value.length < minLength) {
        return `Field ${fieldName} is shorter than the minimum allowed length ${ minLength } chars`;
      } else if (props.value.length > maxLength) {
        return `Field ${fieldName} is larger than the maximum allowed length ${ maxLength } chars`;
      }
    },
  };
}
