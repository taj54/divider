import { dividerLast } from '../../src/index';

describe('dividerLast with string', () => {
  test('divide with single number', () => {
    expect(dividerLast('hello', 2)).toEqual('llo');
  });

  test('divide with multiple number', () => {
    expect(dividerLast('hello', 1, 3)).toEqual('lo');
  });

  test('divide with reverse number', () => {
    expect(dividerLast('hello', 3, 1)).toEqual('lo');
  });

  test('divide with string', () => {
    expect(dividerLast('hello', 'e')).toEqual('llo');
  });

  test('divide with multiple character separators', () => {
    expect(dividerLast('hello', 'e', 'l')).toEqual('o');
  });

  test('flat option (default is false)', () => {
    expect(dividerLast('hello', 2, { flatten: true })).toEqual('llo');
    expect(dividerLast('hello', 2, { flatten: false })).toEqual('llo');
  });

  test('empty separators', () => {
    expect(dividerLast('hello', ...([] as const))).toEqual('hello');
  });

  test('handling undefined or null input', () => {
    expect(dividerLast(null as any, 2)).toEqual('');
    expect(dividerLast(undefined as any, 2)).toEqual('');
  });

  test('edge cases', () => {
    expect(dividerLast('hello')).toEqual('hello');
    expect(dividerLast('', 'a')).toEqual('');
    expect(dividerLast('hello', 0)).toEqual('hello');
    expect(dividerLast('hello', 5)).toEqual('hello');
    expect(dividerLast('hello', 10)).toEqual('hello');
    expect(dividerLast('hello', '😃')).toEqual('hello');
  });
});

describe('dividerLast with string[]', () => {
  test('divide with single number', () => {
    expect(dividerLast(['hello', 'world'], 2)).toEqual('rld');
  });

  test('divide with multiple number', () => {
    expect(dividerLast(['hello', 'world'], 1, 3)).toEqual('ld');
  });

  test('divide with reverse number', () => {
    expect(dividerLast(['hello', 'world'], 3, 1)).toEqual('ld');
  });

  test('divide with string', () => {
    expect(dividerLast(['hello', 'world'], 'e')).toEqual('world');
  });

  test('divide with multiple character separators', () => {
    expect(dividerLast(['hello', 'world'], 'e', 'l')).toEqual('d');
  });

  test('flat option (default is false)', () => {
    expect(dividerLast(['hello', 'world'], 2, { flatten: true })).toEqual(
      'rld'
    );
    expect(dividerLast(['hello', 'world'], 2, { flatten: false })).toEqual(
      'rld'
    );
  });

  test('empty separators', () => {
    expect(dividerLast(['hello', 'world'], ...([] as const))).toEqual('world');
  });

  test('handling undefined or null input', () => {
    expect(dividerLast(null as any, 2)).toEqual('');
    expect(dividerLast(undefined as any, 2)).toEqual('');
  });

  test('edge cases', () => {
    expect(dividerLast(['hello', 'world'])).toEqual('world');
    expect(dividerLast(['', 'world'], 'a')).toEqual('world');
    expect(dividerLast(['hello', 'world'], 0)).toEqual('world');
    expect(dividerLast(['hello', 'world'], 5)).toEqual('world');
    expect(dividerLast(['hello', 'world'], 10)).toEqual('world');
    expect(dividerLast(['hello', 'world'], '😃')).toEqual('world');
  });
});
