import type { DividerResult } from '@/types';
import { isString } from '@/utils/is';

export function ensureStringArray<T extends string | string[]>(
  input: T
): DividerResult<T> {
  return (isString(input) ? [input] : input) as DividerResult<T>;
}
