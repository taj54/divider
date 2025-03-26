export const isString = (arg: unknown): arg is string =>
  typeof arg === 'string';

export const isNumber = (arg: unknown): arg is number =>
  typeof arg === 'number';

export function isOptions(arg: unknown): arg is { flatten?: boolean } {
  return typeof arg === 'object' && arg !== null && 'flatten' in arg;
}

export function isEmptyArray<T>(input: T[]): boolean {
  return Array.isArray(input) && input.length === 0;
}
