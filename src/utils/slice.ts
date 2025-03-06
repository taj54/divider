export function sliceByIndexes(input: string, indexes: number[]): string[] {
  if (!indexes.length) return [input];

  const sortedIndexes = indexes.slice().sort((a, b) => a - b);
  const parts: string[] = [];
  let start = 0;

  for (const index of sortedIndexes) {
    if (index > start && index < input.length) {
      parts.push(input.slice(start, index));
      start = index;
    }
  }

  parts.push(input.slice(start));
  return parts.filter(Boolean);
}
