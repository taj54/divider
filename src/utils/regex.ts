import { isEmptyArray } from '@/utils/is';
import { PERFORMANCE_CONSTANTS, CACHE_KEY_SEPARATOR } from '@/constants';

/**
 * Enhanced regex cache with LRU (Least Recently Used) eviction policy.
 * Prevents memory leaks by limiting cache size and efficiently managing cache entries.
 */
class RegexCache {
  private cache = new Map<string, RegExp>();
  private readonly maxSize: number;

  constructor(maxSize: number = PERFORMANCE_CONSTANTS.MAX_REGEX_CACHE_SIZE) {
    this.maxSize = maxSize;
  }

  /**
   * Retrieves a cached RegExp for the given separators.
   *
   * @param separators - Array of string separators
   * @returns Cached RegExp or null if not found
   */
  get(separators: string[]): RegExp | null {
    const key = this.createKey(separators);
    const regex = this.cache.get(key);

    if (regex) {
      // Move to end (most recently used) for LRU behavior
      this.cache.delete(key);
      this.cache.set(key, regex);
    }

    return regex || null;
  }

  /**
   * Stores a RegExp in the cache with LRU eviction if needed.
   *
   * @param separators - Array of string separators
   * @param regex - Compiled RegExp to cache
   */
  set(separators: string[], regex: RegExp): void {
    const key = this.createKey(separators);

    // If key already exists, remove it first to update position
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // LRU eviction: remove oldest entry if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, regex);
  }

  /**
   * Creates a cache key from separators array.
   * More efficient than JSON.stringify for large arrays.
   *
   * @param separators - Array of string separators
   * @returns Cache key string
   */
  private createKey(separators: string[]): string {
    // Normalize separators: dedupe, filter out empty strings, and sort
    const normalizedSeparators = Array.from(new Set(separators)).filter(
      (separator) => separator !== ''
    );
    // Use join with separator that's unlikely to appear in actual separators
    return normalizedSeparators.join(CACHE_KEY_SEPARATOR);
  }

  /**
   * Gets current cache size for debugging/monitoring.
   *
   * @returns Number of cached entries
   */
  get size(): number {
    return this.cache.size;
  }

  /**
   * Clears all cached entries.
   * Useful for testing or memory management.
   */
  clear(): void {
    this.cache.clear();
  }
}

// Singleton instance for the entire application
const regexCache = new RegexCache();

/**
 * Generates a global RegExp to match any of the provided string separators.
 *
 * - Returns `null` if the input array is empty.
 * - Uses an enhanced LRU cache to avoid recompiling the same pattern.
 * - Escapes each separator string to safely include special regex characters.
 * - Supports both single-character and multi-character separators.
 * - Compiled pattern uses alternation: `(a|b|c)` for multi-character support.
 * - Automatically manages cache size to prevent memory leaks.
 *
 * @param separators - Array of strings to use as delimiters.
 * @returns A global RegExp to match any of the delimiters, or `null` if input is empty.
 */
export function getRegex(separators: string[]): RegExp | null {
  if (isEmptyArray(separators)) return null;

  // Check cache first
  const cached = regexCache.get(separators);
  if (cached) return cached;

  // Compile new regex and cache it
  // Remove duplicates and handle empty strings
  const uniqueSeparators = Array.from(new Set(separators)).filter(
    (separator) => separator !== ''
  );

  if (uniqueSeparators.length === 0) {
    // If all separators were empty strings, return null
    return null;
  }

  // Build pattern using alternation for multi-character support
  const pattern = uniqueSeparators.map(escapeRegExp).join('|');
  const regex = new RegExp(`(?:${pattern})`, 'g');

  regexCache.set(separators, regex);
  return regex;
}

/**
 * Escapes special characters in a string to be used safely in a regular expression.
 *
 * For example, '.' becomes '\.', '*' becomes '\*', etc.
 * This prevents unintended behavior when dynamically constructing RegExp patterns.
 *
 * @param str - The string to escape.
 * @returns The escaped string, safe for use in RegExp constructors.
 */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Export for testing and debugging purposes
export { regexCache };
