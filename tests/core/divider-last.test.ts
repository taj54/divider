import { dividerLast } from '../../src/index';

const runDividerLastTests = (label: string, input: string | string[]) => {
  describe(`${label}`, () => {
    test('divide with single number', () => {
      expect(dividerLast(input, 2)).toEqual('rld');
    });

    test('divide with multiple number', () => {
      expect(dividerLast(input, 1, 3)).toEqual('ld');
    });

    test('divide with reverse number', () => {
      expect(dividerLast(input, 3, 1)).toEqual('ld');
    });

    test('divide with string', () => {
      expect(dividerLast(input, 'e')).toEqual('world');
    });

    test('divide with multiple character separators', () => {
      expect(dividerLast(input, 'e', 'l')).toEqual('d');
    });

    test('empty separators', () => {
      expect(dividerLast(input, ...([] as const))).toEqual('world');
    });

    test('handling undefined or null input', () => {
      expect(dividerLast(null as any, 2)).toEqual('');
      expect(dividerLast(undefined as any, 2)).toEqual('');
    });

    test('edge cases', () => {
      expect(dividerLast(input)).toEqual('world');
      expect(dividerLast(input, 'a')).toEqual('world');
      expect(dividerLast(input, 0)).toEqual('world');
      expect(dividerLast(input, 5)).toEqual('world');
      expect(dividerLast(input, 10)).toEqual('world');
      expect(dividerLast(input, '😃')).toEqual('world');
    });
  });
};

runDividerLastTests('dividerLast with string', 'world');
runDividerLastTests('dividerLast with string[]', ['hello', 'world']);
