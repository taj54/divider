import type { DividerResult } from '@/types';
import { isString } from '@/utils/is';

/**
 * Ensures that the input is returned as a string array.
 *
 * - If the input is a single string, it returns an array containing that string.
 * - If the input is already a string array, it is returned as-is.
 *
 * This utility is helpful for normalizing input types when both `string` and `string[]`
 * are supported.
 *
 * @param input - A string or array of strings
 * @returns A normalized string array
 */
export function ensureStringArray<T extends string | string[]>(
  input: T
): DividerResult<T> {
  return (isString(input) ? [input] : input) as DividerResult<T>;
}
