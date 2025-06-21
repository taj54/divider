import {
  ensureStringArray,
  getFirstElement,
  getLastElement,
} from '../../src/utils/array';

describe('ensureStringArray', () => {
  test('wrap a string in an array', () => {
    expect(ensureStringArray('hello')).toEqual(['hello']);
  });

  test('return the same array if input is already an array', () => {
    const arr = ['a', 'b', 'c'];
    expect(ensureStringArray(arr)).toBe(arr);
  });

  test('return the same array if input is an empty array', () => {
    const arr: string[] = [];
    expect(ensureStringArray(arr)).toBe(arr);
  });
});

describe('getFirstElement', () => {
  test('return the first element of a non-empty array', () => {
    const array = ['a', 'b', 'c'];
    const fallback = 'fallback';

    const result = getFirstElement(array, fallback);

    expect(result).toBe('a');
  });

  test('return the fallback when the array is empty', () => {
    const array: string[] = [];
    const fallback = 'fallback';

    const result = getFirstElement(array, fallback);

    expect(result).toBe('fallback');
  });
});

describe('getLastElement', () => {
  test('return the last element of a non-empty array', () => {
    const array = ['x', 'y', 'z'];
    const fallback = 'fallback';

    const result = getLastElement(array, fallback);

    expect(result).toBe('z');
  });

  test('return the fallback when the array is empty', () => {
    const array: string[] = [];
    const fallback = 'fallback';

    const result = getLastElement(array, fallback);

    expect(result).toBe('fallback');
  });
});
