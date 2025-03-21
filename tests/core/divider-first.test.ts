import { dividerFirst } from '../../src/index';

const runDividerFirstTests = (label: string, input: string | string[]) => {
  describe(`${label}`, () => {
    test('divide with single number', () => {
      expect(dividerFirst(input, 2)).toEqual('he');
    });

    test('divide with multiple number', () => {
      expect(dividerFirst(input, 1, 3)).toEqual('h');
    });

    test('divide with reverse number', () => {
      expect(dividerFirst(input, 3, 1)).toEqual('h');
    });

    test('divide with string', () => {
      expect(dividerFirst(input, 'e')).toEqual('h');
    });

    test('divide with multiple character separators', () => {
      expect(dividerFirst(input, 'e', 'l')).toEqual('h');
    });

    describe('flat option', () => {
      test('default (false)', () => {
        expect(dividerFirst(input, 2, { flatten: false })).toEqual('he');
      });

      test('explicit true', () => {
        expect(dividerFirst(input, 2, { flatten: true })).toEqual('he');
      });
    });

    test('empty separators', () => {
      expect(dividerFirst(input, ...([] as const))).toEqual('hello');
    });

    test('handling undefined or null input', () => {
      expect(dividerFirst(null as any, 2)).toEqual('');
      expect(dividerFirst(undefined as any, 2)).toEqual('');
    });

    test('edge cases', () => {
      expect(dividerFirst(input)).toEqual('hello');
      expect(dividerFirst(input, 'a')).toEqual('hello');
      expect(dividerFirst(input, 0)).toEqual('hello');
      expect(dividerFirst(input, 5)).toEqual('hello');
      expect(dividerFirst(input, 10)).toEqual('hello');
      expect(dividerFirst(input, '😃')).toEqual('hello');
    });
  });
};

runDividerFirstTests('dividerFirst with string', 'hello');
runDividerFirstTests('dividerFirst with string[]', ['hello', 'world']);
