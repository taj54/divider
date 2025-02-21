export function divider(
  input: string,
  ...separators: (number | string)[]
): string[] {
  const result: string[] = [];

  if (typeof input !== 'string' || separators.length === 0) {
    return [input];
  }

  let indices: number[] = [];
  let strSeparators: string[] = [];

  // Classify number and string delimiters
  for (const sep of separators) {
    if (typeof sep === 'number') {
      indices.push(sep);
    } else {
      strSeparators.push(sep);
    }
  }

  // Divide by number delimiters
  indices = [...new Set(indices)].sort((a, b) => a - b);
  let prevIndex = 0;
  for (const index of indices) {
    if (index > prevIndex && index < input.length) {
      result.push(input.slice(prevIndex, index));
      prevIndex = index;
    }
  }
  result.push(input.slice(prevIndex));

  // Re-divide by string delimiters
  if (strSeparators.length > 0) {
    return result.flatMap((part) =>
      part
        .split(new RegExp(`[${strSeparators.join('')}]`, 'g'))
        .filter((s) => s.length > 0)
    );
  }

  return result;
}
