import { divider } from '../src/index';

describe('divider', () => {
  test('divide with single number', () => {
    expect(divider('hello', 2)).toEqual(['he', 'llo']);
  });

  test('divide with multiple number', () => {
    expect(divider('hello', 1, 3)).toEqual(['h', 'el', 'lo']);
    expect(divider('hello', 1, 3, 4)).toEqual(['h', 'el', 'l', 'o']);
    expect(divider('hello', 1, 3, 5)).toEqual(['h', 'el', 'lo']);
  });

  test('divide with reverse number', () => {
    expect(divider('hello', 2, 1)).toEqual(['h', 'e', 'llo']);
    expect(divider('hello', 5, 3)).toEqual(['hel', 'lo']);
  });

  test('divide with string', () => {
    expect(divider('hello', 'l')).toEqual(['he', 'l', 'l', 'o']);
  });
});
