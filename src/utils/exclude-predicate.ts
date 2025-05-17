import type { DividerExcludeMode } from '@/types';
import { isEmptyString, isWhitespaceOnly } from '@/utils/is';

export const excludePredicateMap: Record<
  DividerExcludeMode,
  (s: string) => boolean
> = {
  none: () => true,
  empty: (s) => !isEmptyString(s),
  whitespace: (s) => !isWhitespaceOnly(s),
};
