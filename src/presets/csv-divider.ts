import type { DividerStringResult } from '@/types';
import type { CsvDividerOptions } from '@/types/preset';
import { divider } from '@/core/divider';

/**
 * Tokenize by delimiter using core `divider`, but fall back to native `split`
 * if empty tokens (from consecutive/trailing delimiters) are lost.
 */
function tokenizePreservingEmpties(input: string, delimiter: string): string[] {
  const viaCore = divider(input, delimiter);
  // If re-joining does not equal the original, empties were likely collapsed.
  if (viaCore.join(delimiter) !== input) {
    return input.split(delimiter); // preserves consecutive/trailing empties
  }
  return viaCore;
}

function countUnescapedQuotes(s: string, q: string) {
  const doubled = q + q;
  const noEsc = s.split(doubled).join('');
  let cnt = 0;
  for (let i = 0; i < noEsc.length; i++) if (noEsc[i] === q) cnt++;
  return cnt;
}

/**
 * Remove outer quotes while keeping surrounding spaces; restore escaped quotes.
 */
function unquotePreservingOuterSpaces(s: string, q: string, lenient = true) {
  const doubled = q + q;
  const isSpace = (ch: string) => ch === ' ' || ch === '\t';
  let l = 0,
    r = s.length - 1;
  while (l <= r && isSpace(s[l])) l++;
  while (r >= l && isSpace(s[r])) r--;

  if (l <= r) {
    const startsQ = s[l] === q;
    const endsQ = s[r] === q;
    if (startsQ && endsQ && r > l) {
      s = s.slice(0, l) + s.slice(l + 1, r) + s.slice(r + 1);
    } else if (lenient && startsQ) {
      s = s.slice(0, l) + s.slice(l + 1);
      let rr = s.length - 1;
      while (rr >= 0 && isSpace(s[rr])) rr--;
      if (rr >= 0 && s[rr] === q) s = s.slice(0, rr) + s.slice(rr + 1);
    }
  }
  return s.split(doubled).join(q);
}

export function csvDivider(
  input: string,
  options: CsvDividerOptions = {}
): DividerStringResult {
  const { trim = false, quoteChar = '"', delimiter = ',' } = options;

  if (input === '') return [''];

  // 1) Tokenize (preserving consecutive/trailing empties)
  const tokens = tokenizePreservingEmpties(input, delimiter);

  const out: string[] = [];
  let current = '';
  let inQuotes = false;

  const finalize = () => {
    let field = unquotePreservingOuterSpaces(current, quoteChar, true);
    if (trim) field = field.trim();
    out.push(field);
    current = '';
  };

  // 2) Fold tokens; merge while inside quotes
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    current = current === '' ? t : current + delimiter + t;
    inQuotes = countUnescapedQuotes(current, quoteChar) % 2 === 1;
    if (!inQuotes) finalize();
  }

  // 3) Lenient finalize (unclosed quotes)
  if (current !== '') finalize();

  return out;
}
