export type DividerResult<
  T extends string | string[],
  F extends boolean = false,
> = T extends string ? string[] : F extends true ? string[] : string[][];
