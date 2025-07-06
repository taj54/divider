// Common test data for divider functions
export const TEST_STRINGS = {
  HELLO: 'hello',
  WORLD: 'world',
  HELLO_WORLD: 'hello world',
  UNICODE: 'hello😃world',
  WHITESPACE_ALT: '  ab  cd ef  ',
  EMPTY: '',
  SPACES_ONLY: '   ',
  // For dividerLoop tests
  ABCDEFGH: 'abcdefgh',
  ABCDEFGHI: 'abcdefghi',
  ABCDEFGHIJ: 'abcdefghij',
  ABCDE: 'abcde',
  ABCDEF: 'abcdef',
  ABC: 'abc',
  // For dividerNumberString tests
  ABC123DEF: 'abc123def',
  ABC123: 'abc123',
  NUM123: '123',
  ABC123_SPACED: ' abc 123 ',
} as const;

export const TEST_ARRAYS = {
  HELLO_WORLD: ['hello', 'world'] as string[],
  HELLO_NEW_WORLD: ['hello', 'new world'] as string[],
  EMPTY: [] as string[],
  SINGLE_EMPTY: [''] as string[],
  // For dividerLoop tests
  ABCDEF_GHIJKLMN: ['abcdef', 'ghijklmn'] as string[],
  ABCDEF_GHIJKL: ['abcdef', 'ghijkl'] as string[],
  HELLO_WORLD_SPACED: ['  hello', 'world  '] as string[],
  ABCDEFGHIJ_KLMNOPQRST: ['abcdefghij', 'klmnopqrst'] as string[],
  HELLO_WORLD_SPACED_2: [' hello ', ' world '] as string[],
  HELLO_WORLD_SPACED_3: ['  hello ', ' world  '] as string[],
  // For dividerNumberString tests
  ABC123_45Z: ['abc123', '45z'] as string[],
  A1_B2_SPACED: ['  a1 ', ' b2 '] as string[],
  A1_B2_SPACED_2: [' a1 ', ' b2 '] as string[],
  SPACES_ONLY: ['   '] as string[],
} as const;

export const TEST_SEPARATORS = {
  NUMBERS: {
    SINGLE: 2,
    MULTIPLE: [1, 3] as const,
    REVERSE: [3, 1] as const,
    ZERO: 0,
    LARGE: 10,
    // For dividerLoop tests
    THREE: 3,
    NEGATIVE: -1,
  },
  STRINGS: {
    SINGLE: 'e',
    MULTIPLE: ['e', 'l'] as const,
    NOT_FOUND: 'a',
    UNICODE: '😃',
    SPACE: ' ',
    DOT: '.',
  },
} as const;

export const EXPECTED_RESULTS = {
  DIVIDER_FIRST: {
    STRING: {
      singleNumber: 'he',
      multipleNumbers: 'h',
      reverseNumbers: 'h',
      stringSeparator: 'h',
      multipleStringSeparators: 'h',
      emptySeparators: 'hello',
      edgeCases: ['hello', 'hello', 'hello', 'hello', 'hello', 'hello'],
    },
    ARRAY: {
      singleNumber: 'he',
      multipleNumbers: 'h',
      reverseNumbers: 'h',
      stringSeparator: 'h',
      multipleStringSeparators: 'h',
      emptySeparators: 'hello',
      edgeCases: ['hello', 'hello', 'hello', 'hello', 'hello', 'hello'],
    },
  },
  DIVIDER_LAST: {
    STRING: {
      singleNumber: 'rld',
      multipleNumbers: 'ld',
      reverseNumbers: 'ld',
      stringSeparator: 'world',
      multipleStringSeparators: 'd',
      emptySeparators: 'world',
      edgeCases: ['world', 'world', 'world', 'world', 'world', 'world'],
    },
    ARRAY: {
      singleNumber: 'rld',
      multipleNumbers: 'ld',
      reverseNumbers: 'ld',
      stringSeparator: 'world',
      multipleStringSeparators: 'd',
      emptySeparators: 'world',
      edgeCases: ['world', 'world', 'world', 'world', 'world', 'world'],
    },
  },
} as const;
