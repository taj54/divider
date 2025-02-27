export function divider(
  input: string | string[],
  ...args: (number | string | { flatten?: boolean })[]
): string[] | string[][] {
  // extract the options from the input
  const lastArg = args[args.length - 1];
  const options =
    typeof lastArg === 'object' ? (args.pop() as { flatten?: boolean }) : {};
  const separators = args as (number | string)[];

  if (typeof input === 'string') {
    return divideString(input, separators);
  }

  const result = input.map((item) => divideString(item, separators));
  return options.flatten ? result.flat() : result;
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

  // Divide by number delimiters
  let parts: string[] = sliceByIndexes(input, numSeparators);

  // Divide by string delimiters
  if (strSeparators.length) {
    const regex = new RegExp(`[${strSeparators.join('')}]`, 'g');
    parts = parts
      .flatMap((part) => part.split(regex))
      .filter((part) => part !== '');
  }

  return parts;
}

function sliceByIndexes(input: string, indexes: number[]): string[] {
  if (!indexes.length) return [input];

  indexes.sort((a, b) => a - b);
  let parts: string[] = [];
  let start = 0;

  for (const index of indexes) {
    if (index > start && index < input.length) {
      parts.push(input.slice(start, index));
      start = index;
    }
  }

  parts.push(input.slice(start));
  return parts.filter((part) => part !== '');
}
