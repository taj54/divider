type DividerResult<
  T extends string | string[],
  F extends boolean | undefined,
> = T extends string ? string[] : F extends true ? string[] : string[][];

export function divider<T extends string | string[]>(
  input: string | string[],
  ...args: (number | string | { flatten?: boolean })[]
): DividerResult<T, boolean> {
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

  return (options.flatten ? result.flat() : result) as DividerResult<
    T,
    boolean
  >;
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
  const regex = strSeparators.length
    ? new RegExp(`[${strSeparators.map(escapeRegExp).join('')}]`, 'g')
    : null;

  // If there are no number delimiters, split by string delimiters only
  if (numSeparators.length === 0 && strSeparators.length > 0) {
    return input
      .split(new RegExp(`[${strSeparators.map(escapeRegExp).join('')}]`, 'g'))
      .filter(Boolean);
  }

  // Divide by number delimiters
  let parts: string[] = sliceByIndexes(input, numSeparators);

  // Divide by string delimiters
  if (regex) {
    parts = parts.flatMap((part) => part.split(regex!)).filter(Boolean);
  }

  return parts;
}

function sliceByIndexes(input: string, indexes: number[]): string[] {
  if (!indexes.length) return [input];

  const sortedIndexes = indexes.slice().sort((a, b) => a - b);
  const parts = new Array(sortedIndexes.length + 1).fill(null);
  let start = 0;

  for (let i = 0; i < sortedIndexes.length; i++) {
    const index = sortedIndexes[i];
    if (index > start && index < input.length) {
      parts[i] = input.slice(start, index);
      start = index;
    }
  }

  parts[sortedIndexes.length] = input.slice(start);
  return parts.filter(Boolean);
}

function isOptions(arg: unknown): arg is { flatten?: boolean } {
  return typeof arg === 'object' && arg !== null && 'flatten' in arg;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
