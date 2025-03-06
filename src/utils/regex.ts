const regexCache = new Map<string, RegExp>();

export function getRegex(separators: string[]): RegExp | null {
  if (separators.length === 0) return null;
  const key = separators.join('');
  if (!regexCache.has(key)) {
    regexCache.set(
      key,
      new RegExp(`[${separators.map(escapeRegExp).join('')}]`, 'g')
    );
  }
  return regexCache.get(key)!;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
