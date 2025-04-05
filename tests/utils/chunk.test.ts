import { generateIndexes } from '../../src/utils/chunk';

describe('generateIndexes', () => {
  test('generates correct indexes for even division', () => {
    expect(generateIndexes('abcdef', 2)).toEqual([2, 4]);
  });

  test('generates correct indexes for uneven division', () => {
    expect(generateIndexes('abcdefg', 3)).toEqual([3, 6]);
  });

  test('returns empty array when size is larger than length', () => {
    expect(generateIndexes('abc', 10)).toEqual([]);
  });

  test('returns empty array for empty string', () => {
    expect(generateIndexes('', 2)).toEqual([]);
  });

  test('generates all valid cut points for large string', () => {
    const input = 'a'.repeat(20);
    expect(generateIndexes(input, 5)).toEqual([5, 10, 15]);
  });
});
