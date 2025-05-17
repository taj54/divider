import { generateIndexes } from '../../src/utils/chunk';

describe('generateIndexes', () => {
  test('generates indexes with default startOffset (0)', () => {
    expect(generateIndexes('abcdefg', 2)).toEqual([2, 4, 6]);
    expect(generateIndexes('abcdef', 3)).toEqual([3]);
    expect(generateIndexes('abcd', 5)).toEqual([]);
  });

  test('generates indexes with startOffset > 0', () => {
    expect(generateIndexes('abcdefg', 2, 1)).toEqual([3, 5]);
    expect(generateIndexes('abcdefg', 3, 1)).toEqual([4]);
    expect(generateIndexes('abcdefg', 3, 2)).toEqual([5]);
  });

  test('empty array if size is too large (startOffset considered)', () => {
    expect(generateIndexes('abc', 3, 1)).toEqual([]);
  });

  test('handles startOffset === string.length', () => {
    expect(generateIndexes('abc', 2, 3)).toEqual([]);
  });

  test('handles empty string', () => {
    expect(generateIndexes('', 2)).toEqual([]);
    expect(generateIndexes('', 2, 1)).toEqual([]);
  });
});
