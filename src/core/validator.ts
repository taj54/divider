export function isOptions(arg: unknown): arg is { flatten?: boolean } {
  return typeof arg === 'object' && arg !== null && 'flatten' in arg;
}

export function isEmptyArray<T>(input: T[]): boolean {
  return input.length === 0;
}
