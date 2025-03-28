import type { DividerResult, DividerArgs } from '@/core/types';
import { divideString } from '@/core/parser';
import { isString, isNumber, isOptions, isEmptyArray } from '@/utils/is';

export function divider<T extends string | string[], F extends boolean>(
  input: T,
  ...args: DividerArgs<F>
): DividerResult<T, F> {
  if (!isString(input) && !Array.isArray(input)) {
    console.warn(
      "divider: 'input' must be a string or an array of strings. So returning an empty array."
    );
    return [];
  }

  if (isEmptyArray(args)) {
    return (isString(input) ? [input] : input) as DividerResult<T, F>;
  }

  // Extract the options from the input
  const clonedArgs = [...args];
  const lastArg = clonedArgs.at(-1);
  const options = isOptions(lastArg) ? (clonedArgs.slice(0, -1), lastArg) : {};

  // Filter out only numbers and strings
  const { numSeparators, strSeparators } = clonedArgs.reduce<{
    numSeparators: number[];
    strSeparators: string[];
  }>(
    (acc, arg) => {
      if (isNumber(arg)) {
        return { ...acc, numSeparators: [...acc.numSeparators, arg] };
      } else if (isString(arg)) {
        return { ...acc, strSeparators: [...acc.strSeparators, arg] };
      }
      return acc;
    },
    { numSeparators: [], strSeparators: [] }
  );

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
