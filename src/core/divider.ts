import type { DividerResult, DividerArgs } from '@/core/types';
import { divideString } from '@/core/parser';
import { isOptions, isEmptyArray } from '@/utils/is';

export function divider<T extends string | string[], F extends boolean>(
  input: T,
  ...args: DividerArgs<F>
): DividerResult<T, F> {
  if (typeof input !== 'string' && !Array.isArray(input)) {
    console.warn(
      "divider: 'input' must be a string or an array of strings. So returning an empty array."
    );
    return [];
  }

  if (isEmptyArray(args)) {
    return (typeof input === 'string' ? [input] : input) as DividerResult<T, F>;
  }

  // Extract the options from the input
  const lastArg = args[args.length - 1];
  const options = isOptions(lastArg) ? (args.pop(), lastArg) : {};

  // Filter out only numbers and strings
  const { numSeparators, strSeparators } = args.reduce<{
    numSeparators: number[];
    strSeparators: string[];
  }>(
    (acc, arg) => {
      if (typeof arg === 'number') {
        acc.numSeparators.push(arg);
      } else if (typeof arg === 'string') {
        acc.strSeparators.push(arg);
      }
      return acc;
    },
    { numSeparators: [], strSeparators: [] }
  );

  if (typeof input === 'string') {
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
