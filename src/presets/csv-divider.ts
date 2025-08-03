import type { DividerStringResult } from '@/types';
import type { CsvDividerOptions } from '@/types/preset';
import { isEscapedQuote } from '@/utils/is';

const ESCAPED_QUOTE_LENGTH = 2;

/**
 * Divides a CSV string into fields, handling quoted values and optional trimming.
 *
 * - Handles escaped quotes like: "She said ""Hi"""
 * - Respects quoted commas: "a, b",c → ['a, b', 'c']
 * - Optional `trim` to remove surrounding whitespace
 * - Optional `quoteChar` (default: `"`), useful for custom CSV dialects
 *
 * @param input - The CSV-formatted string
 * @param options - Optional settings: trim whitespace, custom quote character
 * @returns An array of string segments
 */
export function csvDivider(
  input: string,
  options: CsvDividerOptions = {}
): DividerStringResult {
  const { trim = false, quoteChar = '"' } = options;
  const result: string[] = [];

  if (input === '') {
    return [''];
  }

  let current = '';
  let inQuotes = false;
  let i = 0;

  const pushField = () => {
    result.push(trim ? current.trim() : current);
    current = '';
  };

  while (i < input.length) {
    const char = input[i];
    const nextChar = input[i + 1];

    if (char === quoteChar) {
      if (inQuotes && isEscapedQuote(char, nextChar, quoteChar)) {
        current += quoteChar;
        i += ESCAPED_QUOTE_LENGTH;
      } else {
        inQuotes = !inQuotes;
        i++;
      }
    } else if (char === ',' && !inQuotes) {
      pushField();
      i++;
    } else {
      current += char;
      i++;
    }
  }

  if (current || input.endsWith(',')) {
    pushField();
  }

  return result;
}
