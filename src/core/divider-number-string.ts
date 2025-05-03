import { isString } from '@/utils/is';
import type { DividerOptions, DividerResult } from '@/core/types';
import { divideNumberString } from '@/utils/divide';
import { applyDividerOptions } from '@/utils/option';

export function dividerNumberString<T extends string | string[]>(
  input: T,
  options?: DividerOptions
): DividerResult<T> {
  const result = isString(input)
    ? divideNumberString(input)
    : input.map(divideNumberString);

  return applyDividerOptions<T>(result, options ?? {});
}
