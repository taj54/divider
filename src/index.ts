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

  // Divide by string delimiters
  let parts: string[] = [];
  let startIndices: number[] = [];
  let currentIndex = 0;

  input
    .split(new RegExp(`[${strSeparators.join('')}]`, 'g'))
    .forEach((part) => {
      if (part) {
        parts.push(part);
        startIndices.push(currentIndex);
      }
      currentIndex += part.length + 1;
    });

  // Divide by number delimiters
  const sortedNumSeparators = [...new Set(numSeparators)].sort((a, b) => a - b);
  let finalParts: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const partStart = startIndices[i];
    let prevIndex = 0;
    const localSeparators = sortedNumSeparators
      .filter((num) => num > partStart && num < partStart + part.length)
      .map((num) => num - partStart);

    for (const index of localSeparators) {
      finalParts.push(part.slice(prevIndex, index));
      prevIndex = index;
    }
    finalParts.push(part.slice(prevIndex));
  }

  return finalParts;
}
