import { divider } from '@/core/divider';
import type { DividerArgs } from '@/core/types';

export function dividerFirst<
  T extends string | string[],
  F extends boolean = false,
>(input: T, ...args: DividerArgs<F>): string {
  const result = divider(input, ...args);

  if (Array.isArray(result[0])) {
    return result[0][0] ?? '';
  }

  return result[0] ?? '';
}
