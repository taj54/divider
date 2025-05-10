import { generateIndexes } from '../../src/utils/chunk';

describe('generateIndexes', () => {
  it('generates indexes with default startOffset (0)', () => {
    expect(generateIndexes('abcdefg', 2)).toEqual([2, 4, 6]);
    expect(generateIndexes('abcdef', 3)).toEqual([3]);
    expect(generateIndexes('abcd', 5)).toEqual([]);
  });

  it('generates indexes with startOffset > 0', () => {
    expect(generateIndexes('abcdefg', 2, 1)).toEqual([3, 5]);
    expect(generateIndexes('abcdefg', 3, 1)).toEqual([4]);
    expect(generateIndexes('abcdefg', 3, 2)).toEqual([5]);
  });

  it('empty array if size is too large (startOffset considered)', () => {
    expect(generateIndexes('abc', 3, 1)).toEqual([]);
  });

  it('handles startOffset === string.length', () => {
    expect(generateIndexes('abc', 2, 3)).toEqual([]);
  });

  it('handles empty string', () => {
    expect(generateIndexes('', 2)).toEqual([]);
    expect(generateIndexes('', 2, 1)).toEqual([]);
  });
});
