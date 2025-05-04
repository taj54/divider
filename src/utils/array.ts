import type { DividerResult } from '@/types';

export function ensureStringArray<T extends string | string[]>(
  input: T
): DividerResult<T> {
  return (typeof input === 'string' ? [input] : input) as DividerResult<T>;
}
