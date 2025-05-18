import { excludePredicateMap } from '../../src/utils/exclude-predicate';

describe('excludePredicateMap', () => {
  const allInputs = ['hello', '', '   ', '\n', '\t', 'world'];

  test('mode: none - returns true for all inputs', () => {
    const predicate = excludePredicateMap.none;
    allInputs.forEach((input) => {
      expect(predicate(input)).toBe(true);
    });
  });

  test('mode: empty - filters out only empty strings', () => {
    const predicate = excludePredicateMap.empty;

    expect(predicate('')).toBe(false);
    expect(predicate(' ')).toBe(true);
    expect(predicate('hello')).toBe(true);
    expect(predicate('\n')).toBe(true);
  });

  test('mode: whitespace - filters out empty and whitespace-only strings', () => {
    const predicate = excludePredicateMap.whitespace;

    expect(predicate('')).toBe(false);
    expect(predicate('   ')).toBe(false);
    expect(predicate('\n')).toBe(false);
    expect(predicate('\t')).toBe(false);
    expect(predicate('hello')).toBe(true);
  });

  test('integration: filter with mode=whitespace', () => {
    const input = ['hello', '', ' ', 'world', '\n'];
    const result = input.filter(excludePredicateMap.whitespace);
    expect(result).toEqual(['hello', 'world']);
  });
});
