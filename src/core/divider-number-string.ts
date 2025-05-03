import { isString } from '@/utils/is';
import type { DividerOptions, DividerResult } from '@/core/types';
import { divideNumberString } from '@/utils/divide';
import { applyDividerOptions } from '@/utils/option';

export function dividerNumberString<
  T extends string | string[],
  F extends boolean = false,
>(input: T, options?: DividerOptions): DividerResult<T, F> {
  const result = isString(input)
    ? divideNumberString(input)
    : input.map(divideNumberString);

  return applyDividerOptions<T, F>(result, options ?? {});
}
