import { divider } from '@/core/divider';
import type { DividerStringResult } from '@/types';
import type { PathDividerOptions } from '@/types/preset';
import { dividePreserve } from '@/utils/quoted';
import { PATH_SEPARATORS } from '@/constants';

/** Split a file path by '/' or '|' into segments. */
export function pathDivider(
  input: string,
  options: PathDividerOptions = {}
): DividerStringResult {
  const { trim = false, collapse = true } = options;

  if (input === '') return [''];

  const segments = collapse
    ? divider(input, PATH_SEPARATORS.SLASH, PATH_SEPARATORS.ALT)
    : dividePreserve(input, PATH_SEPARATORS.ALT).flatMap((part) =>
        dividePreserve(part, PATH_SEPARATORS.SLASH)
      );

  const maybeTrimmed = trim
    ? segments.map((segment) => segment.trim())
    : segments;

  return collapse
    ? maybeTrimmed.filter((segment) => segment !== '')
    : maybeTrimmed;
}
