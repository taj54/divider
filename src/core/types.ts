export type DividerResult<
  T extends string | string[],
  F extends boolean = true,
> = T extends string ? string[] : F extends true ? string[] : string[][];
