import { applyDividerOptions } from '../../src/utils/option';

describe('applyDividerOptions', () => {
  test('trim only', () => {
    const result = [
      ['  a ', ' b'],
      ['c ', ' d '],
    ];
    const options = { trim: true } as const;
    expect(applyDividerOptions(result, options)).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
  });

  test('flatten only', () => {
    const result = [
      ['a', 'b'],
      ['c', 'd'],
    ];
    const options = { flatten: true } as const;
    expect(applyDividerOptions(result, options)).toEqual(['a', 'b', 'c', 'd']);
  });

  test('both trim and flatten', () => {
    const result = [
      [' a ', ' b'],
      ['c ', 'd'],
    ];
    const options = { trim: true, flatten: true } as const;
    expect(applyDividerOptions(result, options)).toEqual(['a', 'b', 'c', 'd']);
  });

  test('neither', () => {
    const result = [
      ['a', 'b'],
      ['c', 'd'],
    ];
    const options = {} as const;
    expect(applyDividerOptions(result, options)).toEqual(result);
  });
});
