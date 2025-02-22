export function divider(
  input: string,
  ...separators: (number | string)[]
): string[] {
  if (typeof input !== 'string' || separators.length === 0) {
    return [input];
  }

  let numSeparators: number[] = [];
  let strSeparators: string[] = [];

  // Classify number and string delimiters
  for (const separator of separators) {
    if (typeof separator === 'number') {
      numSeparators.push(separator);
    } else {
      strSeparators.push(separator);
    }
  }

  // Divide by string delimiters and memorize the starting position
  let parts: string[] = [];
  let startIndices: number[] = [];
  let currentIndex = 0;

  input
    .split(new RegExp(`[${strSeparators.join('')}]`, 'g'))
    .forEach((part) => {
      console.log('part', part);
      if (part) {
        parts.push(part);
        startIndices.push(currentIndex);
      }
      currentIndex += part.length + 1;
    });

  // Divide by number delimiters
  numSeparators = [...new Set(numSeparators)].sort((a, b) => a - b);
  let finalParts: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    let part = parts[i];
    let partStart = startIndices[i];
    let prevIndex = 0;
    let localSeparators = numSeparators
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
