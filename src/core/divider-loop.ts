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

  const finalOptions = options ?? {};
  // If maxChunks is 0 or omitted, no truncation is applied
  const { startOffset = 0, maxChunks = 0 } = finalOptions;

  const applyChunking = (str: string): string[] => {
    const chunks = divider(str, ...generateIndexes(str, size, startOffset));
    return needsTruncation(chunks) ? truncateChunks(chunks) : chunks;
  };

  // Determine whether truncation should occur based on maxChunks
  const needsTruncation = (chunks: string[]): boolean =>
    isNumber(maxChunks) && 0 < maxChunks && maxChunks < chunks.length;

  const truncateChunks = (chunks: string[]): string[] => {
    // Keep the first (maxChunks - 1) chunks; merge the rest into one
    const HEAD_COUNT = maxChunks - 1;
    const head = chunks.slice(0, HEAD_COUNT);
    const tail = chunks.slice(HEAD_COUNT).join('');
    return [...head, tail];
  };

  const result = isString(input)
    ? applyChunking(input)
    : input.map(applyChunking);

  return applyDividerOptions<T>(result, finalOptions);
}
