import { divider } from '@/core/divider';
import type { DividerSeparators } from '@/core/types';

export function dividerFirst<T extends string | string[]>(
  input: T,
  ...args: DividerSeparators
): string {
  const result = divider(input, ...args, { flatten: true });

  return result[0] ?? '';
}
