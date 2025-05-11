import { isString, isNumber, isPositiveInteger } from '@/utils/is';
import { generateIndexes } from '@/utils/chunk';
import { applyDividerOptions } from '@/utils/option';
import type { DividerLoopOptions, DividerResult } from '@/types';
import { divider } from '@/core/divider';

export function dividerLoop<T extends string | string[]>(
  input: T,
  size: number,
  options?: DividerLoopOptions
): DividerResult<T> {
  if (!isPositiveInteger(size)) {
    console.warn('dividerLoop: chunk size must be a positive number');
    return [] as DividerResult<T>;
  }

  const { startOffset = 0, maxChunks } = options ?? {};

  const applyChunking = (str: string) => {
    let chunks = divider(str, ...generateIndexes(str, size, startOffset));

    const shouldTruncateChunks =
      isNumber(maxChunks) && maxChunks > 0 && chunks.length > maxChunks;

    if (shouldTruncateChunks) {
      const head = chunks.slice(0, maxChunks - 1);
      const tail = chunks.slice(maxChunks - 1).join('');
      chunks = [...head, tail];
    }

    return chunks;
  };

  if (isString(input)) {
    const result = applyChunking(input);
    return applyDividerOptions<T>(result, options ?? {});
  }

  const result = input.map(applyChunking);
  return applyDividerOptions<T>(result, options ?? {});
}
