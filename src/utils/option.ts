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
  let output: string[] | string[][] = result;

  if (options.trim) {
    const trimPart = (s: string) => s.trim();

    if (isNestedStringArray(result)) {
      output = result.map((row) => row.map(trimPart).filter(Boolean));
    } else {
      output = result.map(trimPart).filter(Boolean);
    }
  }

  if (options.flatten) {
    output = output.flat();
  }

  return output as DividerResult<T, F>;
}
