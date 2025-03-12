import { getRegex } from '../../src//utils/regex';

describe('getRegex', () => {
  test('returns null for empty separators', () => {
    expect(getRegex([])).toBeNull();
  });

  test('generates regex for single separator', () => {
    const regex = getRegex([',']);
    expect(regex).not.toBeNull();
    expect('hello,world'.split(regex!)).toEqual(['hello', 'world']);
  });

  test('generates regex for multiple separators', () => {
    const regex = getRegex([',', '-']);
    expect(regex).not.toBeNull();
    expect('hello,world-beauty'.split(regex!)).toEqual([
      'hello',
      'world',
      'beauty',
    ]);
  });

  test('escapes special characters correctly', () => {
    const regex = getRegex(['.', '*', '+']);
    expect(regex).not.toBeNull();
    expect('hello.world*beauty+future'.split(regex!)).toEqual([
      'hello',
      'world',
      'beauty',
      'future',
    ]);
  });

  test('equals of caches regex results', () => {
    const regex1 = getRegex([',', '-']);
    const regex2 = getRegex([',', '-']);
    expect(regex1).toBe(regex2);
  });
});
