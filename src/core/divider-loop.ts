import { isString, isPositiveInteger } from '@/utils/is';
import { generateIndexes } from '@/utils/chunk';
import { applyDividerOptions } from '@/utils/option';
import type { DividerOptions, DividerResult } from '@/core/types';
import { divider } from '@/core/divider';

export function dividerLoop<T extends string | string[]>(
  input: T,
  size: number,
  options?: DividerOptions
): DividerResult<T> {
  if (!isPositiveInteger(size)) {
    console.warn('dividerLoop: chunk size must be a positive number');
    return [];
  }

  const applyChunking = (str: string) =>
    divider(str, ...generateIndexes(str, size));

  if (isString(input)) {
    const result = applyChunking(input);
    return applyDividerOptions<T>(result, options ?? {});
  }

  const result = input.map(applyChunking);
  return applyDividerOptions<T>(result, options ?? {});
}
