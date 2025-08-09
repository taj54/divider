import { divider } from '@/core/divider';

/** Split by `sep` while preserving consecutive/trailing empties. */
export function splitPreserve(input: string, sep: string): string[] {
  const viaCore = divider(input, sep);
  return viaCore.join(sep) === input ? viaCore : input.split(sep);
}

/** Count quotes excluding escaped pairs (""). Assumes single-char `quote`. */
export function countUnescaped(text: string, quote: string): number {
  const pair = quote + quote;
  let count = 0;
  for (const chunk of splitPreserve(text, pair)) {
    // occurrences of a single quote == splits - 1
    count += splitPreserve(chunk, quote).length - 1;
  }
  return count;
}

/** Remove an outer quote pair (keep surrounding spaces) and restore "" -> ". */
export function stripOuterQuotes(
  text: string,
  quote: string,
  { lenient = true }: { lenient?: boolean } = {}
): string {
  const pair = quote + quote;
  const isSpace = (c: string) => c === ' ' || c === '\t';

  let left = 0,
    right = text.length - 1;
  while (left <= right && isSpace(text[left])) left++;
  while (right >= left && isSpace(text[right])) right--;

  if (left <= right) {
    const starts = text[left] === quote;
    const ends = text[right] === quote;
    if (starts && ends && right > left) {
      // Remove both quotes as a pair
      text =
        text.slice(0, left) +
        text.slice(left + 1, right) +
        text.slice(right + 1);
    } else if (lenient && starts) {
      // Remove only the starting quote (unclosed or mismatched)
      text = text.slice(0, left) + text.slice(left + 1);
      // Optionally remove a trailing quote (after spaces)
      let r = text.length - 1;
      while (r >= 0 && isSpace(text[r])) r--;
      if (r >= 0 && text[r] === quote)
        text = text.slice(0, r) + text.slice(r + 1);
    }
  }

  return text.split(pair).join(quote);
}

/**
 * Quoted-aware split built on top of `divider`.
 * - Tokenize by delimiter (preserving empties)
 * - Merge tokens while inside quotes
 * - Remove outer quotes, restore escaped quotes, optionally trim
 */
export function quotedSplit(
  line: string,
  {
    delimiter = ',',
    quote = '"',
    trim = false,
    lenient = true,
  }: {
    delimiter?: string;
    quote?: string;
    trim?: boolean;
    lenient?: boolean;
  } = {}
): string[] {
  if (line === '') return [''];

  const pieces = splitPreserve(line, delimiter);
  const fields: string[] = [];
  let buffer = '';
  let insideQuotes = false;

  const flush = () => {
    let v = stripOuterQuotes(buffer, quote, { lenient });
    if (trim) v = v.trim();
    fields.push(v);
    buffer = '';
  };

  for (const piece of pieces) {
    buffer = buffer === '' ? piece : buffer + delimiter + piece;
    insideQuotes = countUnescaped(buffer, quote) % 2 === 1;
    if (!insideQuotes) flush();
  }

  if (buffer !== '') flush();
  return fields;
}
