import { isString, isPositiveInteger } from '@/utils/is';
import { generateIndexes } from '@/utils/chunk';
import type { DividerOptions, DividerResult } from '@/core/types';
import { divider } from '@/core/divider';

export function dividerLoop<T extends string | string[], F extends boolean>(
  input: T,
  size: number,
  options?: DividerOptions<F>
): DividerResult<T, F> {
  if (!isPositiveInteger(size)) {
    console.warn('dividerLoop: chunk size must be a positive number');
    return [];
  }

  if (isString(input)) {
    const indexes = generateIndexes(input, size);
    return divider(input, ...indexes) as DividerResult<T, F>;
  }

  const result = input.map((item) => {
    const indexes = generateIndexes(item, size);
    return divider(item, ...indexes);
  });

  const flatten = options?.flatten ?? false;
  return (flatten ? result.flat() : result) as DividerResult<T, F>;
}
