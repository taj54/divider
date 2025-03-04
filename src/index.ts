type DividerResult<
  T extends string | string[],
  F extends boolean | undefined,
> = T extends string ? string[] : F extends true ? string[] : string[][];

export function divider<T extends string | string[]>(
  input: string | string[],
  ...args: (number | string | { flatten?: boolean })[]
): DividerResult<T, boolean> {
  // extract the options from the input
  const lastArg = args[args.length - 1];
  const options = isOptions(lastArg) ? lastArg : {};

  // filter out only numbers and strings
  const separators = args.filter(
    (arg): arg is number | string =>
      typeof arg === 'number' || typeof arg === 'string'
  );

  if (typeof input === 'string') {
    return divideString(input, separators);
  }

  const result = input.map((item) => divideString(item, separators));
  return (options.flatten ? result.flat() : result) as DividerResult<
    T,
    boolean
  >;
}

function divideString(
  input: string,
  separators: (number | string)[]
): string[] {
  if (separators.length === 0) {
    return [input];
  }

  const { numSeparators, strSeparators } = separators.reduce<{
    numSeparators: number[];
    strSeparators: string[];
  }>(
    (acc, separator) => {
      typeof separator === 'number'
        ? acc.numSeparators.push(separator)
        : acc.strSeparators.push(separator);
      return acc;
    },
    { numSeparators: [], strSeparators: [] }
  );

  // If there are no number delimiters, split by string delimiters only
  if (numSeparators.length === 0 && strSeparators.length > 0) {
    return input
      .split(new RegExp(`[${strSeparators.map(escapeRegExp).join('')}]`, 'g'))
      .filter(Boolean);
  }

  // Divide by number delimiters
  let parts: string[] = sliceByIndexes(input, numSeparators);

  // Divide by string delimiters
  if (strSeparators.length) {
    const regex = new RegExp(
      `[${strSeparators.map(escapeRegExp).join('')}]`,
      'g'
    );
    parts = parts.flatMap((part) => part.split(regex)).filter(Boolean);
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
