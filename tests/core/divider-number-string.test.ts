import { dividerNumberString } from '../../src/core/divider-number-string';

describe('dividerNumberString with string', () => {
  test('divide number and string', () => {
    expect(dividerNumberString('abc123def')).toEqual(['abc', '123', 'def']);
  });

  test('handles strings with only number or string', () => {
    expect(dividerNumberString('123')).toEqual(['123']);
    expect(dividerNumberString('abc')).toEqual(['abc']);
  });

  test('handles empty string', () => {
    expect(dividerNumberString('')).toEqual([]);
  });
});

describe('dividerNumberString with string[]', () => {
  const input = ['abc123', '45z'];

  test('returns nested array by default', () => {
    expect(dividerNumberString(input)).toEqual([
      ['abc', '123'],
      ['45', 'z'],
    ]);
  });

  test('returns flattened array when flatten option is true', () => {
    expect(dividerNumberString(input, { flatten: true })).toEqual([
      'abc',
      '123',
      '45',
      'z',
    ]);
  });

  test('explicit flatten: false returns nested array', () => {
    expect(dividerNumberString(input, { flatten: false })).toEqual([
      ['abc', '123'],
      ['45', 'z'],
    ]);
  });
});

describe('dividerNumberString with trim option', () => {
  test('trims each part in string mode', () => {
    expect(dividerNumberString(' abc 123 ', { trim: true })).toEqual([
      'abc',
      '123',
    ]);
  });

  test('trims and flattens with string[] input', () => {
    expect(
      dividerNumberString(['  a1 ', ' b2 '], { flatten: true, trim: true })
    ).toEqual(['a', '1', 'b', '2']);
  });

  test('preserves empty parts if trim is false', () => {
    expect(
      dividerNumberString([' a1 ', ' b2 '], { flatten: true, trim: false })
    ).toEqual([' a', '1', ' ', ' b', '2', ' ']);
  });

  test('removes empty strings after trim', () => {
    expect(dividerNumberString(['   '], { flatten: true, trim: true })).toEqual(
      []
    );
  });
});
