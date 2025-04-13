import {
  isOptions,
  isEmptyArray,
  isPositiveInteger,
  isValidInput,
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
  test('returns true for positive integers', () => {
    expect(isPositiveInteger(1)).toBe(true);
    expect(isPositiveInteger(100)).toBe(true);
  });

  test('returns false for zero', () => {
    expect(isPositiveInteger(0)).toBe(false);
  });

  test('returns false for negative integers', () => {
    expect(isPositiveInteger(-1)).toBe(false);
    expect(isPositiveInteger(-100)).toBe(false);
  });

  test('returns false for floating point numbers', () => {
    expect(isPositiveInteger(1.1)).toBe(false);
    expect(isPositiveInteger(-3.14)).toBe(false);
  });

  test('returns false for non-number values', () => {
    expect(isPositiveInteger('5')).toBe(false);
    expect(isPositiveInteger(null)).toBe(false);
    expect(isPositiveInteger(undefined)).toBe(false);
    expect(isPositiveInteger(NaN)).toBe(false);
    expect(isPositiveInteger({})).toBe(false);
    expect(isPositiveInteger([])).toBe(false);
  });
});

describe('isValidInput', () => {
  test('returns true for string', () => {
    expect(isValidInput('hello')).toBe(true);
  });

  test('returns true for string[]', () => {
    expect(isValidInput(['hello', 'world'])).toBe(true);
  });

  test('returns false for number', () => {
    expect(isValidInput(123)).toBe(false);
  });

  test('returns false for boolean', () => {
    expect(isValidInput(true)).toBe(false);
  });

  test('returns false for null', () => {
    expect(isValidInput(null)).toBe(false);
  });

  test('returns false for undefined', () => {
    expect(isValidInput(undefined)).toBe(false);
  });

  test('returns false for object', () => {
    expect(isValidInput({ key: 'value' })).toBe(false);
  });

  test('returns false for array of non-strings', () => {
    expect(isValidInput([1, 2, 3])).toBe(false);
  });
});
