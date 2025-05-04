import { divider } from '@/core/divider';
import type { DividerSeparators } from '@/types';

export function dividerLast(
  input: string | string[],
  ...args: DividerSeparators
): string {
  const result = divider(input, ...args, { flatten: true }) as string[];

  return result.at(-1) ?? '';
}
