/**
 * Splits a string into an array of numeric and non-numeric segments.
 *
 * For example:
 * `'abc123def456'` → `['abc', '123', 'def', '456']`
 *
 * Uses a regular expression to match sequences of digits (`\d+`)
 * and sequences of non-digits (`\D+`) and returns them in order.
 *
 * @param str - The input string to divide
 * @returns An array of segmented strings
 */
export function divideNumberString(str: string): string[] {
  return (str.match(/\d+|\D+/g) || []).filter(Boolean);
}
