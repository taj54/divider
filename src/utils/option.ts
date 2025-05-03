import type { DividerOptions, DividerResult } from '@/core/types';
import {
  isString,
  isNumber,
  isOptions,
  isNestedStringArray,
  isWhitespaceOnly,
} from '@/utils/is';

/**
 * Extracts `options` object and cleans argument list.
 *
 * This function processes a list of arguments which may include
 * an optional `DividerOptions` object at the end.
 *
 * - If the last argument is a valid `DividerOptions`, it is extracted and removed.
 * - The remaining arguments are filtered to keep only `string` or `number` types.
 *
 * @param args - An array of strings, numbers, or a `DividerOptions` object.
 * @returns An object containing:
 *   - `cleanedArgs`: An array of strings and numbers only.
 *   - `options`: The extracted `DividerOptions` object (or an empty object if none found).
 */
export function extractOptions<F extends boolean>(
  args: (string | number | DividerOptions)[]
): {
  cleanedArgs: (string | number)[];
  options: DividerOptions;
} {
  const clonedArgs = [...args];
  const lastArg = clonedArgs.at(-1);

  const options = isOptions(lastArg)
    ? (clonedArgs.pop(), lastArg as DividerOptions)
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
 * Applies `DividerOptions` to a divided result.
 *
 * This function modifies the result array based on the given options:
 *
 * - If `trim` is enabled, all string segments are trimmed of surrounding whitespace.
 * - If `flatten` is enabled, nested arrays are flattened into a single-level array.
 *
 * @param result - The divided result to process (could be flat or nested).
 * @param options - The `DividerOptions` that determine how to modify the result.
 * @returns The processed result after applying the options.
 */
export function applyDividerOptions<
  T extends string | string[],
  F extends boolean,
>(result: string[] | string[][], options: DividerOptions): DividerResult<T, F> {
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

  if (options.excludeEmpty) {
    output = isNestedStringArray(output)
      ? output.filter(
          (arr) => Array.isArray(arr) && arr.some((s) => !isWhitespaceOnly(s))
        )
      : output.filter((s) => !isWhitespaceOnly(s));
  }

  return output as DividerResult<T, F>;
}
