export function sliceByIndexes(input: string, indexes: number[]): string[] {
  if (indexes.length === 0) return [input];

  const parts: string[] = [];
  let start = 0;

  for (const index of indexes) {
    if (index <= start || index >= input.length) continue;
    parts.push(input.slice(start, index));
    start = index;
  }

  if (start < input.length) {
    parts.push(input.slice(start));
  }

  return parts;
}
