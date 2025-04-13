import { extractOptions } from '../../src/utils/options';

describe('extractOptions', () => {
  test('separate options from args', () => {
    const args = [1, 'x', { flatten: true }];

    const { cleanedArgs, options } = extractOptions(args);

    expect(cleanedArgs).toEqual([1, 'x']);
    expect(options).toEqual({ flatten: true });
  });

  test('return empty options when not provided', () => {
    const args = [1, 'x'];

    const { cleanedArgs, options } = extractOptions(args);

    expect(cleanedArgs).toEqual([1, 'x']);
    expect(options).toEqual({});
  });

  test('return all cleanedArgs if only strings and numbers', () => {
    const args = ['a', 2, 3, 'b'];

    const { cleanedArgs, options } = extractOptions(args);

    expect(cleanedArgs).toEqual(['a', 2, 3, 'b']);
    expect(options).toEqual({});
  });

  test('handle empty args', () => {
    const args: (string | number)[] = [];

    const { cleanedArgs, options } = extractOptions(args);

    expect(cleanedArgs).toEqual([]);
    expect(options).toEqual({});
  });
});
