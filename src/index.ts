import type { DividerResult } from '@/utils/types';
import { sliceByIndexes } from '@/utils/slice';
import { getRegex } from '@/utils/regex';

export function divider<T extends string | string[]>(
  input: string | string[],
  ...args: (number | string | { flatten?: boolean })[]
): DividerResult<T> {
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

function divideString(
  input: string,
  numSeparators: number[],
  strSeparators: string[]
): string[] {
  if (numSeparators.length === 0 && strSeparators.length === 0) {
    return [input];
  }

  // Precompile regex for string separators
  const regex = getRegex(strSeparators);

  // Divide by number delimiters
  let parts: string[] = sliceByIndexes(input, numSeparators);

  // Divide by string delimiters
  return regex
    ? parts.flatMap((part) => part.split(regex)).filter(Boolean)
    : parts;
}

function isOptions(arg: unknown): arg is { flatten?: boolean } {
  return typeof arg === 'object' && arg !== null && 'flatten' in arg;
}
