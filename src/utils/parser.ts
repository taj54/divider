import { isEmptyArray } from '@/utils/is';
import { getRegex } from '@/utils/regex';
import { sliceByIndexes } from '@/utils/slice';
import { sortAscending } from '@/utils/sort';

export function divideString(
  input: string,
  numSeparators: number[],
  strSeparators: string[]
): string[] {
  if (isEmptyArray(numSeparators) && isEmptyArray(strSeparators)) {
    return [input];
  }

  // Precompile regex for string separators
  const regex = getRegex(strSeparators);

  // Divide by number delimiters
  const sortedNumSeparators = sortAscending(numSeparators);
  const parts: string[] = sliceByIndexes(input, sortedNumSeparators);

  // Divide by string delimiters
  return regex
    ? parts.flatMap((part) => part.split(regex)).filter(Boolean)
    : parts;
}
