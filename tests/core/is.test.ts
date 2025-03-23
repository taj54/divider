import { isOptions, isEmptyArray } from '../../src/utils/is';

describe('isOptions', () => {
  test('true for valid options object', () => {
    expect(isOptions({ flatten: true })).toBe(true);
    expect(isOptions({ flatten: false })).toBe(true);
    expect(isOptions({ flatten: undefined })).toBe(true);
  });

  test('false for objects without flatten property', () => {
    expect(isOptions({})).toBe(false);
    expect(isOptions({ other: true })).toBe(false);
  });

  test('false for non-object values', () => {
    expect(isOptions(null)).toBe(false);
    expect(isOptions(undefined)).toBe(false);
    expect(isOptions(true)).toBe(false);
    expect(isOptions(false)).toBe(false);
    expect(isOptions(123)).toBe(false);
    expect(isOptions('string')).toBe(false);
    expect(isOptions([])).toBe(false);
    expect(isOptions(() => {})).toBe(false);
  });
});

describe('isEmptyArray', () => {
  test('true for an empty array', () => {
    expect(isEmptyArray([])).toBe(true);
  });

  test('false for a non-empty array', () => {
    expect(isEmptyArray([1])).toBe(false);
    expect(isEmptyArray(['a', 'b'])).toBe(false);
  });

  test('false for non-array inputs', () => {
    expect(isEmptyArray(undefined as any)).toBe(false);
    expect(isEmptyArray(null as any)).toBe(false);
    expect(isEmptyArray('' as any)).toBe(false);
    expect(isEmptyArray(0 as any)).toBe(false);
    expect(isEmptyArray({} as any)).toBe(false);
  });
});
