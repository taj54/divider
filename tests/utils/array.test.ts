import { ensureArray } from '../../src/utils/array';

describe('ensureArray', () => {
  test('wrap a string in an array', () => {
    expect(ensureArray('hello')).toEqual(['hello']);
  });

  test('return the same array if input is already an array', () => {
    const arr = ['a', 'b', 'c'];
    expect(ensureArray(arr)).toBe(arr);
  });

  test('return the same array if input is an empty array', () => {
    const arr: string[] = [];
    expect(ensureArray(arr)).toBe(arr);
  });
});
