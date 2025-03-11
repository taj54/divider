import type { DividerResult } from '@/core/types';
import { divideString } from '@/core/parser';
import { isOptions } from '@/core/validator';

export function divider<T extends string | string[]>(
  input: string | string[],
  ...args: (number | string | { flatten?: boolean })[]
): DividerResult<T> {
  if (input === null || input === undefined) {
    return [];
  }

  if (args.length === 0) {
    return typeof input === 'string' ? [input] : input;
  }

  // Extract the options from the input
  const lastArg = args[args.length - 1];
  const options = isOptions(lastArg) ? lastArg : {};

  // Filter out only numbers and strings
  const numSeparators: number[] = [];
  const strSeparators: string[] = [];

  for (const arg of args) {
    if (typeof arg === 'number') {
      numSeparators.push(arg);
    } else if (typeof arg === 'string') {
      strSeparators.push(arg);
    }
  }

  if (typeof input === 'string') {
    return divideString(input, numSeparators, strSeparators);
  }

  const result = input.map((item) =>
    divideString(item, numSeparators, strSeparators)
  );

  return (options.flatten ? result.flat() : result) as DividerResult<T>;
}
