import { dividerLoop } from '../../src/index';

describe('dividerLoop with string', () => {
  test('divides evenly', () => {
    expect(dividerLoop('abcdefgh', 2)).toEqual(['ab', 'cd', 'ef', 'gh']);
  });

  test('divides unevenly', () => {
    expect(dividerLoop('abcdefghi', 3)).toEqual(['abc', 'def', 'ghi']);
    expect(dividerLoop('abcdefghij', 3)).toEqual(['abc', 'def', 'ghi', 'j']);
  });

  describe('with startOffset option', () => {
    test('applies startOffset correctly', () => {
      expect(dividerLoop('abcdefgh', 2, { startOffset: 1 })).toEqual([
        'abc',
        'de',
        'fg',
        'h',
      ]);
    });

    test('returns original string if startOffset exceeds string length', () => {
      expect(dividerLoop('abc', 2, { startOffset: 10 })).toEqual(['abc']);
    });
  });

  describe('with maxChunks option', () => {
    test('limits chunks to 2 for a string input', () => {
      expect(dividerLoop('abcdefghij', 3, { maxChunks: 2 })).toEqual([
        'abc',
        'defghij',
      ]);
    });

    test('does not alter result when chunk count is below maxChunks', () => {
      expect(dividerLoop('abcde', 2, { maxChunks: 5 })).toEqual([
        'ab',
        'cd',
        'e',
      ]);
    });

    test('returns a single merged chunk when maxChunks is 1', () => {
      expect(dividerLoop('abcdef', 2, { maxChunks: 1 })).toEqual(['abcdef']);
    });
  });

  test('handles empty string', () => {
    expect(dividerLoop('', 3)).toEqual(['']);
  });

  test('handles invalid size', () => {
    expect(dividerLoop('abcdef', 0)).toEqual([]);
    expect(dividerLoop('abcdef', -1, { flatten: true })).toEqual([]);
  });
});

describe('dividerLoop with string[]', () => {
  const input = ['abcdef', 'ghijklmn'];

  test('divides evenly', () => {
    expect(dividerLoop(input, 2)).toEqual([
      ['ab', 'cd', 'ef'],
      ['gh', 'ij', 'kl', 'mn'],
    ]);
  });

  test('divides with flatten true', () => {
    expect(dividerLoop(input, 2, { flatten: true })).toEqual([
      'ab',
      'cd',
      'ef',
      'gh',
      'ij',
      'kl',
      'mn',
    ]);
  });

  describe('with startOffset option', () => {
    test('applies startOffset correctly', () => {
      expect(dividerLoop(['abcdef', 'ghijkl'], 2, { startOffset: 1 })).toEqual([
        ['abc', 'de', 'f'],
        ['ghi', 'jk', 'l'],
      ]);
    });

    test('works with startOffset + flatten + trim', () => {
      expect(
        dividerLoop(['  hello', 'world  '], 2, {
          startOffset: 1,
          flatten: true,
          trim: true,
        })
      ).toEqual(['h', 'el', 'lo', 'wor', 'ld']);
    });
  });

  describe('with maxChunks option', () => {
    test('limits chunks to 2 for an array of strings', () => {
      expect(
        dividerLoop(['abcdefghij', 'klmnopqrst'], 3, {
          maxChunks: 2,
        })
      ).toEqual([
        ['abc', 'defghij'],
        ['klm', 'nopqrst'],
      ]);
    });

    test('flattens the result when flatten: true is used', () => {
      expect(
        dividerLoop(['abcdefghij', 'klmnopqrst'], 3, {
          maxChunks: 2,
          flatten: true,
        })
      ).toEqual(['abc', 'defghij', 'klm', 'nopqrst']);
    });
  });

  test('handles invalid size', () => {
    expect(dividerLoop(input, 0, { flatten: true })).toEqual([]);
    expect(dividerLoop(input, -1, { flatten: true })).toEqual([]);
  });

  test('handles empty array', () => {
    expect(dividerLoop([], 2, { flatten: true })).toEqual([]);
  });
});

describe('dividerLoop with trim option', () => {
  test('trims whitespace in string mode', () => {
    expect(dividerLoop('  ab  cd ef  ', 2, { trim: true })).toEqual([
      'ab',
      'cd',
      'e',
      'f',
    ]);
  });

  test('does not trim when trim is false (string)', () => {
    expect(dividerLoop('  ab  cd ef  ', 2, { trim: false })).toEqual([
      '  ',
      'ab',
      '  ',
      'cd',
      ' e',
      'f ',
      ' ',
    ]);
  });

  test('trims whitespace in string[] mode with flatten', () => {
    expect(
      dividerLoop([' hello ', ' world '], 2, {
        flatten: true,
        trim: true,
      })
    ).toEqual(['h', 'el', 'lo', 'w', 'or', 'ld']);
  });

  test('does not trim when trim is false (string[] flatten)', () => {
    expect(
      dividerLoop(['  hello ', ' world  '], 2, {
        flatten: true,
        trim: false,
      })
    ).toEqual(['  ', 'he', 'll', 'o ', ' w', 'or', 'ld', '  ']);
  });
});
