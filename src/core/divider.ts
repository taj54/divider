import type { DividerResult, DividerArgs } from '@/core/types';
import { divideString } from '@/core/parser';
import { isString, isEmptyArray, isValidInput } from '@/utils/is';
import { ensureArray } from '@/utils/array';
import { extractOptions } from '@/utils/options';
import { classifySeparators } from '@/utils/separator';

export function divider<T extends string | string[], F extends boolean>(
  input: T,
  ...args: DividerArgs<F>
): DividerResult<T, F> {
  if (!isValidInput(input)) {
    console.warn(
      "divider: 'input' must be a string or an array of strings. So returning an empty array."
    );
    return [];
  }

  if (isEmptyArray(args)) {
    return ensureArray<T>(input) as DividerResult<T, F>;
  }

  const { cleanedArgs, options } = extractOptions(args);
  const { numSeparators, strSeparators } = classifySeparators(cleanedArgs);

  if (isString(input)) {
    return divideString(input, numSeparators, strSeparators) as DividerResult<
      T,
      F
    >;
  }

  const result = input.map((item) =>
    divideString(item, numSeparators, strSeparators)
  );

  return (options.flatten ? result.flat() : result) as DividerResult<T, F>;
}
