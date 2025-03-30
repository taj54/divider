import { ensureArray } from '../../src/utils/array';

describe('ensureArray', () => {
  test('wrap a string in an array', () => {
    expect(ensureArray('hello')).toEqual(['hello']);
  });

  test('wrap a number in an array', () => {
    expect(ensureArray(42)).toEqual([42]);
  });

  test('wrap an object in an array', () => {
    const obj = { key: 'value' };
    expect(ensureArray(obj)).toEqual([obj]);
  });

  test('return the same array if input is already an array', () => {
    const arr = ['a', 'b', 'c'];
    expect(ensureArray(arr)).toBe(arr);
  });

  test('return the same array if input is an empty array', () => {
    const arr: any[] = [];
    expect(ensureArray(arr)).toBe(arr);
  });

  test('wrap a boolean in an array', () => {
    expect(ensureArray(true)).toEqual([true]);
  });

  test('wrap null in an array', () => {
    expect(ensureArray(null)).toEqual([null]);
  });

  test('wrap undefined in an array', () => {
    expect(ensureArray(undefined)).toEqual([undefined]);
  });
});
