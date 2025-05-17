export type DividerExcludeMode = 'none' | 'empty' | 'whitespace';

export type DividerResult<T extends string | string[]> = T extends string
  ? string[]
  : string[][];

export type DividerOptions = {
  flatten?: boolean;
  trim?: boolean;
  exclude?: DividerExcludeMode;
};

export type DividerLoopOptions = DividerOptions & {
  startOffset?: number;
  maxChunks?: number;
};

export type DividerSeparators = (number | string)[];

export type DividerArgs =
  | DividerSeparators
  | [...DividerSeparators, DividerOptions];
