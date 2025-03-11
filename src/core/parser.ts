import { sliceByIndexes } from '@/utils/slice';
import { getRegex } from '@/utils/regex';

export function divideString(
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
  numSeparators.sort((a, b) => a - b);
  let parts: string[] = sliceByIndexes(input, numSeparators);

  // Divide by string delimiters
  return regex
    ? parts.flatMap((part) => part.split(regex)).filter(Boolean)
    : parts;
}
