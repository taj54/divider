import {
  isOptions,
  isEmptyArray,
  isPositiveInteger,
  isValidInput,
  isStringArray,
  isNestedStringArray,
} from '../../src/utils/is';

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

describe('isPositiveInteger', () => {
  test('true for positive integers', () => {
    expect(isPositiveInteger(1)).toBe(true);
    expect(isPositiveInteger(100)).toBe(true);
  });

  test('false for zero', () => {
    expect(isPositiveInteger(0)).toBe(false);
  });

  test('false for negative integers', () => {
    expect(isPositiveInteger(-1)).toBe(false);
    expect(isPositiveInteger(-100)).toBe(false);
  });

  test('false for floating point numbers', () => {
    expect(isPositiveInteger(1.1)).toBe(false);
    expect(isPositiveInteger(-3.14)).toBe(false);
  });

  test('false for non-number values', () => {
    expect(isPositiveInteger('5')).toBe(false);
    expect(isPositiveInteger(null)).toBe(false);
    expect(isPositiveInteger(undefined)).toBe(false);
    expect(isPositiveInteger(NaN)).toBe(false);
    expect(isPositiveInteger({})).toBe(false);
    expect(isPositiveInteger([])).toBe(false);
  });
});

describe('isValidInput', () => {
  test('true for string', () => {
    expect(isValidInput('hello')).toBe(true);
  });

  test('true for string[]', () => {
    expect(isValidInput(['hello', 'world'])).toBe(true);
  });

  test('false for number', () => {
    expect(isValidInput(123)).toBe(false);
  });

  test('false for boolean', () => {
    expect(isValidInput(true)).toBe(false);
  });

  test('false for null', () => {
    expect(isValidInput(null)).toBe(false);
  });

  test('false for undefined', () => {
    expect(isValidInput(undefined)).toBe(false);
  });

  test('false for object', () => {
    expect(isValidInput({ key: 'value' })).toBe(false);
  });

  test('false for array of non-strings', () => {
    expect(isValidInput([1, 2, 3])).toBe(false);
  });
});

describe('isStringArray', () => {
  test('true for array of strings', () => {
    expect(isStringArray(['a', 'b', 'c'])).toBe(true);
  });

  test('false for array with non-string elements', () => {
    expect(isStringArray(['a', 1, 'b'])).toBe(false);
    expect(isStringArray([1, 2, 3])).toBe(false);
  });

  test('false for non-array input', () => {
    expect(isStringArray('abc')).toBe(false);
    expect(isStringArray(null)).toBe(false);
    expect(isStringArray(undefined)).toBe(false);
    expect(isStringArray({})).toBe(false);
  });

  test('true for empty array (assumes string[])', () => {
    expect(isStringArray([])).toBe(true);
  });
});

describe('isNestedStringArray', () => {
  test('true for array of string arrays', () => {
    expect(
      isNestedStringArray([
        ['a', 'b'],
        ['c', 'd'],
      ])
    ).toBe(true);
  });

  test('false for mixed-type inner arrays', () => {
    expect(
      isNestedStringArray([
        ['a', 1],
        ['c', 'd'],
      ])
    ).toBe(false);
  });

  test('false for flat string array', () => {
    expect(isNestedStringArray(['a', 'b', 'c'])).toBe(false);
  });

  test('false for empty array', () => {
    expect(isNestedStringArray([])).toBe(false);
  });

  test('false for empty inner arrays', () => {
    expect(isNestedStringArray([[]])).toBe(false);
  });

  test('false for non-array input', () => {
    expect(isNestedStringArray('abc')).toBe(false);
    expect(isNestedStringArray(null)).toBe(false);
    expect(isNestedStringArray(undefined)).toBe(false);
    expect(isNestedStringArray({})).toBe(false);
  });
});
