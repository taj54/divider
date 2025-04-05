import { isString, isNumber } from '@/utils/is';
import { generateIndexes } from '@/utils/chunk';
import type { DividerOptions, DividerResult } from '@/core/types';
import { divider } from '@/core/divider';

export function dividerLoop<T extends string | string[], F extends boolean>(
  input: T,
  size: number,
  options?: DividerOptions<F>
): DividerResult<T, F> {
  if (!isNumber(size) || size <= 0) {
    console.warn('dividerLoop: chunk size must be a positive number');
    return [];
  }

  const flatten = options?.flatten ?? false;

  if (isString(input)) {
    const indexes = generateIndexes(input, size);
    return divider(input, ...indexes, { flatten }) as DividerResult<T, F>;
  }

  const result = input.map((item) => {
    const indexes = generateIndexes(item, size);
    return divider(item, ...indexes);
  });

  return (flatten ? result.flat() : result) as DividerResult<T, F>;
}
