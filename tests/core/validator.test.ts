import { isOptions } from '../../src//core/validator';

describe('isOptions', () => {
  test('true for valid options object', () => {
    expect(isOptions({ flatten: true })).toBe(true);
    expect(isOptions({ flatten: false })).toBe(true);
    expect(isOptions({ flatten: undefined })).toBe(true);
  });

  test('false for objects without flatten property', () => {
    expect(isOptions({})).toBe(false);
    expect(isOptions({ other: true })).toBe(false);
  });

  test('false for non-object values', () => {
    expect(isOptions(null)).toBe(false);
    expect(isOptions(undefined)).toBe(false);
    expect(isOptions(true)).toBe(false);
    expect(isOptions(false)).toBe(false);
    expect(isOptions(123)).toBe(false);
    expect(isOptions('string')).toBe(false);
    expect(isOptions([])).toBe(false);
    expect(isOptions(() => {})).toBe(false);
  });
});
