import type { DividerOptions, DividerResult } from '@/core/types';
import { isNestedStringArray } from '@/utils/is';

/**
 * Applies options like `trim` and `flatten` to the divided result.
 *
 * - If `trim` is true, trims all string segments.
 * - If `flatten` is true, flattens the nested array.
 */
export function applyDividerOptions<
  T extends string | string[],
  F extends boolean,
>(
  result: string[] | string[][],
  options: DividerOptions<F>
): DividerResult<T, F> {
  let output = result;

  // First, apply trimming if needed
  if (options.trim) {
    const trim = (s: string) => s.trim();
    output = isNestedStringArray(output)
      ? output.map((row) => row.map(trim).filter(Boolean))
      : output.map(trim).filter(Boolean);
  }

  // Then, apply flattening if needed
  if (options.flatten) {
    output = isNestedStringArray(output) ? output.flat() : output;
  }

  return output as DividerResult<T, F>;
}
