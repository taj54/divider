import { isString } from '@/utils/is';
import type { DividerOptions, DividerResult } from '@/core/types';
import { divideNumberString } from '@/utils/divide';

export function dividerNumberString<
  T extends string | string[],
  F extends boolean = false,
>(input: T, options?: DividerOptions<F>): DividerResult<T, F> {
  const result = isString(input)
    ? divideNumberString(input)
    : input.map(divideNumberString);

  return (options?.flatten ? result.flat() : result) as DividerResult<T, F>;
}
