import { sortAscending } from '../../src/utils/sort';

describe('sortAscending', () => {
  test('sorts an unsorted array in ascending order', () => {
    expect(sortAscending([3, 1, 4, 2])).toEqual([1, 2, 3, 4]);
  });

  test('returns already sorted array (new instance)', () => {
    const input = [1, 2, 3, 4];

    const result = sortAscending(input);

    expect(result).toEqual([1, 2, 3, 4]);
    expect(result).not.toBe(input);
  });

  test('handles array with duplicate values', () => {
    expect(sortAscending([3, 1, 2, 2, 1])).toEqual([1, 1, 2, 2, 3]);
  });

  test('handles array with negative numbers', () => {
    expect(sortAscending([3, -1, 0, 2])).toEqual([-1, 0, 2, 3]);
  });

  test('returns empty array if input is empty', () => {
    expect(sortAscending([])).toEqual([]);
  });

  test('does not mutate original array', () => {
    const original = [5, 2, 4];
    const copy = [...original];

    sortAscending(original);

    expect(original).toEqual(copy);
  });
});
