import { isString } from '@/utils/is';
import type { DividerOptions, DividerResult } from '@/core/types';

export function dividerNumberString<
  T extends string | string[],
  F extends boolean = false,
>(input: T, options?: DividerOptions<F>): DividerResult<T, F> {
  const regex = /\d+|\D+/g;

  const divide = (str: string): string[] => {
    return (str.match(regex) || []).filter(Boolean);
  };

  if (isString(input)) {
    return divide(input) as DividerResult<T, F>;
  }

  const result: string[][] = input.map(divide);
  return (options?.flatten ? result.flat() : result) as DividerResult<T, F>;
}
