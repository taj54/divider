import { classifySeparators } from '../../src//utils/separator';

describe('classifySeparators', () => {
  test('classifies only number separators', () => {
    const result = classifySeparators([1, 2, 3]);

    expect(result).toEqual({ numSeparators: [1, 2, 3], strSeparators: [] });
  });

  test('classifies only string separators', () => {
    const result = classifySeparators(['a', 'b', 'c']);

    expect(result).toEqual({
      numSeparators: [],
      strSeparators: ['a', 'b', 'c'],
    });
  });

  test('classifies mixed number and string separators', () => {
    const result = classifySeparators([1, 'a', 2, 'b']);

    expect(result).toEqual({
      numSeparators: [1, 2],
      strSeparators: ['a', 'b'],
    });
  });

  test('returns empty arrays for empty input', () => {
    const result = classifySeparators([]);

    expect(result).toEqual({ numSeparators: [], strSeparators: [] });
  });
});
