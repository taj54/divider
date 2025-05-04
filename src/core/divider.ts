import type { DividerResult, DividerArgs } from '@/types';
import { divideString } from '@/utils/parser';
import { isString, isEmptyArray, isValidInput } from '@/utils/is';
import { ensureStringArray } from '@/utils/array';
import { extractOptions } from '@/utils/option';
import { classifySeparators } from '@/utils/separator';
import { applyDividerOptions } from '@/utils/option';

export function divider<T extends string | string[]>(
  input: T,
  ...args: DividerArgs
): DividerResult<T> {
  if (!isValidInput(input)) {
    console.warn(
      "divider: 'input' must be a string or an array of strings. So returning an empty array."
    );
    return [];
  }

  if (isEmptyArray(args)) {
    return ensureStringArray<T>(input);
  }

  const { cleanedArgs, options } = extractOptions(args);
  const { numSeparators, strSeparators } = classifySeparators(cleanedArgs);

  const applyDivision = (str: string) =>
    divideString(str, numSeparators, strSeparators);

  const result = isString(input)
    ? applyDivision(input)
    : input.map(applyDivision);

  return applyDividerOptions<T>(result, options);
}
