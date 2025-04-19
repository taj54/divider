export function divideNumberString(str: string): string[] {
  return (str.match(/\d+|\D+/g) || []).filter(Boolean);
}
