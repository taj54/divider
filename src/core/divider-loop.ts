import { isString, isNumber, isPositiveInteger } from '@/utils/is';
import { generateIndexes } from '@/utils/chunk';
import { applyDividerOptions } from '@/utils/option';
import type { DividerLoopOptions, DividerResult } from '@/types';
import { divider } from '@/core/divider';
import { PERFORMANCE_CONSTANTS } from '@/constants';

/**
 * Determines if the chunks array needs to be truncated based on maxChunks setting
 */
function needsTruncation(chunks: string[], maxChunks: number): boolean {
  return isNumber(maxChunks) && 0 < maxChunks && maxChunks < chunks.length;
}

/**
 * Truncates chunks array to maxChunks length, merging remaining chunks into the last one
 */
function truncateChunks(chunks: string[], maxChunks: number): string[] {
  const headCount = maxChunks - 1;
  const head = chunks.slice(0, headCount);
  const tail = chunks.slice(headCount).join('');
  return [...head, tail];
}

/**
 * Applies chunking logic to a single string
 */
function applyChunking(
  str: string,
  size: number,
  startOffset: number,
  maxChunks: number
): string[] {
  const chunks = divider(str, ...generateIndexes(str, size, startOffset));
  return needsTruncation(chunks, maxChunks)
    ? truncateChunks(chunks, maxChunks)
    : chunks;
}

/**
 * Divides input into chunks of specified size with optional configuration.
 *
 * This function provides a way to split input into equal-sized chunks with additional control:
 * - Can specify starting offset for the chunking
 * - Can limit the maximum number of chunks produced
 * - Supports both string and array inputs
 * - When maxChunks is specified, remaining content is merged into the last chunk
 *
 * @param input - String or array of strings to divide into chunks
 * @param size - Size of each chunk
 * @param options - Configuration options for chunking behavior
 * @param options.startOffset - Starting position for the first chunk (default: 0)
 * @param options.maxChunks - Maximum number of chunks to produce (default: 0 = no limit)
 * @returns Array of chunks based on input type and options
 * @example
 * dividerLoop("abcdef", 2) // returns ["ab", "cd", "ef"]
 * dividerLoop("abcdef", 2, { maxChunks: 2 }) // returns ["ab", "cdef"]
 */
export function dividerLoop<T extends string | string[]>(
  input: T,
  size: number,
  options?: DividerLoopOptions
): DividerResult<T> {
  // Validate chunk size
  if (!isPositiveInteger(size)) {
    console.warn('dividerLoop: chunk size must be a positive number');
    return [] as DividerResult<T>;
  }

  const finalOptions = options ?? {};
  const {
    startOffset = PERFORMANCE_CONSTANTS.DEFAULT_START_OFFSET,
    maxChunks = PERFORMANCE_CONSTANTS.DEFAULT_MAX_CHUNKS,
  } = finalOptions;

  // Process input based on its type (string or string[])
  const result = isString(input)
    ? applyChunking(input, size, startOffset, maxChunks)
    : input.map((str) => applyChunking(str, size, startOffset, maxChunks));

  return applyDividerOptions<T>(result, finalOptions);
}
