import type { DividerOptions, DividerResult } from '@/core/types';
import { isString, isNumber, isOptions, isNestedStringArray } from '@/utils/is';

export function extractOptions<F extends boolean>(
  args: (string | number | DividerOptions<F>)[]
): {
  cleanedArgs: (string | number)[];
  options: DividerOptions<F>;
} {
  const clonedArgs = [...args];
  const lastArg = clonedArgs.at(-1);

  const options = isOptions(lastArg)
    ? (clonedArgs.pop(), lastArg as DividerOptions<F>)
    : {};

  const cleanedArgs = clonedArgs.filter(
    (arg): arg is string | number => isString(arg) || isNumber(arg)
  );

  return {
    cleanedArgs,
    options,
  };
}

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
    output = output.flat();
  }

  return output as DividerResult<T, F>;
}
