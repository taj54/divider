import { dividerOptionKeys } from '@/core/constants';

export type DividerOptionKey = (typeof dividerOptionKeys)[number];

export type DividerResult<
  T extends string | string[],
  F extends boolean = false,
> = T extends string ? string[] : F extends true ? string[] : string[][];

export type DividerOptions = Partial<Record<DividerOptionKey, boolean>>;

export type DividerSeparators = (number | string)[];

export type DividerArgs =
  | DividerSeparators
  | [...DividerSeparators, DividerOptions];
