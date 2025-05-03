import type { DividerResult } from '@/core/types';

export function ensureStringArray<T extends string | string[]>(
  input: T
): DividerResult<T> {
  return (typeof input === 'string' ? [input] : input) as DividerResult<T>;
}
