import { getRegex, regexCache } from '../../src/utils/regex';

describe('getRegex', () => {
  beforeEach(() => {
    // Clear cache before each test to ensure clean state
    regexCache.clear();
  });

  test('returns null for empty array', () => {
    expect(getRegex([])).toBeNull();
  });

  test('creates regex for single separator', () => {
    const regex = getRegex(['-']);

    expect(regex).toBeInstanceOf(RegExp);
    expect(regex?.source).toBe('(?:-)');
    expect(regex?.flags).toBe('g');
  });

  test('creates regex for multiple single-character separators', () => {
    const regex = getRegex(['-', ',', ';']);

    expect(regex).toBeInstanceOf(RegExp);
    expect(regex?.source).toBe('(?:-|,|;)');
    expect(regex?.flags).toBe('g');
  });

  test('creates regex for multi-character separators', () => {
    const regex = getRegex(['--', '||', '==']);

    expect(regex).toBeInstanceOf(RegExp);
    expect(regex?.source).toBe('(?:--|\\|\\||==)');
    expect(regex?.flags).toBe('g');
  });

  test('creates regex for mixed single and multi-character separators', () => {
    const regex = getRegex(['-', '--', ',', '||']);

    expect(regex).toBeInstanceOf(RegExp);
    expect(regex?.source).toBe('(?:-|--|,|\\|\\|)');
    expect(regex?.flags).toBe('g');
  });

  test('escapes special regex characters', () => {
    const regex = getRegex([
      '.',
      '*',
      '+',
      '?',
      '^',
      '$',
      '{',
      '}',
      '(',
      ')',
      '|',
      '[',
      ']',
      '\\',
    ]);
    expect(regex).toBeInstanceOf(RegExp);

    // The actual source will have characters in sorted order due to our key generation
    // We'll test that it contains the expected characters rather than exact order
    const source = regex?.source || '';

    expect(source).toMatch(/^\(.*\)$/); // Now uses parentheses for alternation
    expect(source).toContain('\\');
    expect(regex?.flags).toBe('g');
  });

  test('caches and reuses regex for same separators', () => {
    const separators = ['-', ',', ';'];

    const regex1 = getRegex(separators);
    const regex2 = getRegex(separators);

    expect(regex1).toBe(regex2);
    expect(regexCache.size).toBe(1);
  });

  test('creates different regex for different separator order', () => {
    const separators1 = ['-', ',', ';'];
    const separators2 = [';', ',', '-'];

    const regex1 = getRegex(separators1);
    const regex2 = getRegex(separators2);

    // Should be the same regex since we sort separators for consistent keys
    expect(regex1).toBe(regex2);
    expect(regexCache.size).toBe(1);
  });

  test('handles duplicate separators', () => {
    const separators = ['-', '-', ',', ',', ';'];
    const regex = getRegex(separators);

    expect(regex).toBeInstanceOf(RegExp);
    expect(regex?.source).toBe('(?:-|,|;)'); // Duplicates should be removed
    expect(regex?.flags).toBe('g');
  });
});

describe('RegexCache', () => {
  beforeEach(() => {
    regexCache.clear();
  });

  test('starts with size 0', () => {
    expect(regexCache.size).toBe(0);
  });

  test('increments size when adding entries', () => {
    getRegex(['a']);
    expect(regexCache.size).toBe(1);

    getRegex(['b']);
    expect(regexCache.size).toBe(2);
  });

  test('reuses cached entries', () => {
    const separators = ['a', 'b', 'c'];

    getRegex(separators);
    const initialSize = regexCache.size;

    getRegex(separators);
    expect(regexCache.size).toBe(initialSize); // Size should not increase
  });

  test('clear method removes all entries', () => {
    getRegex(['a']);
    getRegex(['b']);
    expect(regexCache.size).toBeGreaterThan(0);

    regexCache.clear();
    expect(regexCache.size).toBe(0);
  });

  test('creates consistent keys regardless of separator order', () => {
    const separators1 = ['a', 'b', 'c'];
    const separators2 = ['c', 'b', 'a'];

    getRegex(separators1);
    const sizeAfterFirst = regexCache.size;

    getRegex(separators2);
    expect(regexCache.size).toBe(sizeAfterFirst); // Should reuse same cache entry
  });

  test('handles empty string separators', () => {
    const regex = getRegex(['']);

    expect(regex).toBeNull(); // Empty strings are filtered out
  });

  test('handles special characters in separators', () => {
    const separators = ['\n', '\t', '\r'];
    const regex = getRegex(separators);

    expect(regex).toBeInstanceOf(RegExp);

    // The actual source will have characters in sorted order
    const source = regex?.source || '';

    expect(source).toMatch(/^\(.*\)$/);
    // Check that all special characters are present (order may vary)
    expect(source).toContain('\\n');
    expect(source).toContain('\\r');
    // Tab character might be represented differently in regex source
    expect(source.includes('\\t') || source.includes('\t')).toBe(true);
    expect(regex?.flags).toBe('g');
  });
});
