export function generateIndexes(text: string, size: number): number[] {
  const indexes: number[] = [];
  for (let i = size; i < text.length; i += size) {
    indexes.push(i);
  }
  return indexes;
}
