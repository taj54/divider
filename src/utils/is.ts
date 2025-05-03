import { DividerOptions } from '@/core/types';
import { dividerOptionKeys } from '@/core/constants';

export function isString(arg: unknown): arg is string {
  return typeof arg === 'string';
}

export function isNumber(arg: unknown): arg is number {
  return typeof arg === 'number';
}

export function isOptions(arg: unknown): arg is DividerOptions {
  if (typeof arg !== 'object' || arg === null) return false;
  return dividerOptionKeys.some((key) => key in arg);
}

export function isEmptyArray<T>(input: T[]): boolean {
  return Array.isArray(input) && input.length === 0;
}

export function isPositiveInteger(value: unknown): boolean {
  return Number.isInteger(value) && (value as number) > 0;
}

export function isValidInput(input: unknown): input is string | string[] {
  return isString(input) || (Array.isArray(input) && input.every(isString));
}

export function isStringArray(input: unknown): input is string[] {
  return Array.isArray(input) && input.every(isString);
}

export function isNestedStringArray(input: unknown): input is string[][] {
  return (
    Array.isArray(input) &&
    input.length > 0 &&
    Array.isArray(input[0]) &&
    input[0].length > 0 &&
    isStringArray(input[0])
  );
}

export function isWhitespaceOnly(s: string) {
  return s.trim() === '';
}
