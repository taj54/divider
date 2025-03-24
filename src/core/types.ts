export type DividerResult<
  T extends string | string[],
  F extends boolean = false,
> = T extends string ? string[] : F extends true ? string[] : string[][];

export type DividerOptions<F extends boolean> = { flatten?: F };

export type DividerSeparators = (number | string)[];

export type DividerArgs<F extends boolean> =
  | DividerSeparators
  | [...DividerSeparators, DividerOptions<F>];
