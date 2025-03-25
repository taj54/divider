import { divider } from '@/core/divider';
import type { DividerSeparators } from '@/core/types';

export function dividerFirst(
  input: string | string[],
  ...args: DividerSeparators
): string {
  const result = divider(input, ...args, { flatten: true });

  return result[0] ?? '';
}
