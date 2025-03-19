import { dividerFirst } from '../../src/index';

describe('dividerFirst with string', () => {
  test('divide with single number', () => {
    expect(dividerFirst('hello', 2)).toEqual('he');
  });

  test('divide with multiple number', () => {
    expect(dividerFirst('hello', 1, 3)).toEqual('h');
  });

  test('divide with reverse number', () => {
    expect(dividerFirst('hello', 3, 1)).toEqual('h');
  });

  test('divide with string', () => {
    expect(dividerFirst('hello', 'e')).toEqual('h');
  });

  test('divide with multiple character separators', () => {
    expect(dividerFirst('hello', 'e', 'l')).toEqual('h');
  });

  test('flat option (default is false)', () => {
    expect(dividerFirst('hello', 2, { flatten: true })).toEqual('he');
    expect(dividerFirst('hello', 2, { flatten: false })).toEqual('he');
  });

  test('empty separators', () => {
    expect(dividerFirst('hello', ...([] as const))).toEqual('hello');
  });

  test('handling undefined or null input', () => {
    expect(dividerFirst(null as any, 2)).toEqual('');
    expect(dividerFirst(undefined as any, 2)).toEqual('');
  });

  test('edge cases', () => {
    expect(dividerFirst('hello')).toEqual('hello');
    expect(dividerFirst('', 'a')).toEqual('');
    expect(dividerFirst('hello', 0)).toEqual('hello');
    expect(dividerFirst('hello', 5)).toEqual('hello');
    expect(dividerFirst('hello', 10)).toEqual('hello');
    expect(dividerFirst('hello', '😃')).toEqual('hello');
  });
});

describe('dividerFirst with string[]', () => {
  test('divide with single number', () => {
    expect(dividerFirst(['hello', 'world'], 2)).toEqual('he');
  });

  test('divide with multiple number', () => {
    expect(dividerFirst(['hello', 'world'], 1, 3)).toEqual('h');
  });

  test('divide with reverse number', () => {
    expect(dividerFirst(['hello', 'world'], 3, 1)).toEqual('h');
  });

  test('divide with string', () => {
    expect(dividerFirst(['hello', 'world'], 'e')).toEqual('h');
  });

  test('divide with multiple character separators', () => {
    expect(dividerFirst(['hello', 'world'], 'e', 'l')).toEqual('h');
  });

  test('flat option (default is false)', () => {
    expect(dividerFirst(['hello', 'world'], 2, { flatten: true })).toEqual(
      'he'
    );
    expect(dividerFirst(['hello', 'world'], 2, { flatten: false })).toEqual(
      'he'
    );
  });

  test('empty separators', () => {
    expect(dividerFirst(['hello', 'world'], ...([] as const))).toEqual('hello');
  });

  test('handling undefined or null input', () => {
    expect(dividerFirst(null as any, 2)).toEqual('');
    expect(dividerFirst(undefined as any, 2)).toEqual('');
  });

  test('edge cases', () => {
    expect(dividerFirst(['hello', 'world'])).toEqual('hello');
    expect(dividerFirst(['', 'world'], 'a')).toEqual('');
    expect(dividerFirst(['hello', 'world'], 0)).toEqual('hello');
    expect(dividerFirst(['hello', 'world'], 5)).toEqual('hello');
    expect(dividerFirst(['hello', 'world'], 10)).toEqual('hello');
    expect(dividerFirst(['hello', 'world'], '😃')).toEqual('hello');
  });
});
