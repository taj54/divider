import { divideNumberString } from '../../src/utils/divide';

describe('divideNumberString', () => {
  describe('divides string with number', () => {
    test('In the middle', () => {
      expect(divideNumberString('abc123def')).toEqual(['abc', '123', 'def']);
    });

    test('At the start', () => {
      expect(divideNumberString('123abc')).toEqual(['123', 'abc']);
    });

    test('At the end', () => {
      expect(divideNumberString('abc123')).toEqual(['abc', '123']);
    });

    test('Multiple numeric groups in a single string', () => {
      expect(divideNumberString('ab12cd34ef')).toEqual([
        'ab',
        '12',
        'cd',
        '34',
        'ef',
      ]);
    });
  });

  test('handles string with only letters', () => {
    expect(divideNumberString('abc')).toEqual(['abc']);
  });

  test('handles string with only numbers', () => {
    expect(divideNumberString('123456')).toEqual(['123456']);
  });

  test('handles alternating letters and digits', () => {
    expect(divideNumberString('a1b2c3')).toEqual([
      'a',
      '1',
      'b',
      '2',
      'c',
      '3',
    ]);
  });

  test('handles empty string', () => {
    expect(divideNumberString('')).toEqual([]);
  });

  test('handles symbols and mixed characters', () => {
    expect(divideNumberString('abc123!@#456')).toEqual([
      'abc',
      '123',
      '!@#',
      '456',
    ]);
  });
});
