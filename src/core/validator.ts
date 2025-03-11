export function isOptions(arg: unknown): arg is { flatten?: boolean } {
  return typeof arg === 'object' && arg !== null && 'flatten' in arg;
}
