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
