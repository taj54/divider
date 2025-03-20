import { divider } from '@/core/divider';
import type { DividerArgs } from '@/core/types';

export function dividerLast<T extends string | string[], F extends boolean>(
  input: T,
  ...args: DividerArgs<F>
): string {
  const result = divider(input, ...args);

  if (result.length === 0) return '';

  const lastElement = result[result.length - 1];

  return Array.isArray(lastElement) ? (lastElement.at(-1) ?? '') : lastElement;
}
