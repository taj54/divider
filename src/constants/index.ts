/**
 * Constants defining the available exclusion modes for divider functions.
 * These modes control how empty or whitespace segments are handled in the output.
 *
 * @constant
 * @enum {string}
 * @property {string} NONE - Keep all segments, including empty and whitespace-only segments
 * @property {string} EMPTY - Exclude empty segments (length = 0)
 * @property {string} WHITESPACE - Exclude segments that contain only whitespace characters
 */
export const DividerExcludeModes = {
  NONE: 'none',
  EMPTY: 'empty',
  WHITESPACE: 'whitespace',
} as const;

/**
 * List of valid option keys for the divider functions.
 * These keys are used to validate and process divider options.
 *
 * - `flatten`: Whether to flatten nested arrays into a single level
 * - `trim`: Whether to trim whitespace from string segments
 */
export const dividerOptionKeys = ['flatten', 'trim'] as const;

/**
 * Type representing a valid divider option key.
 */
export type DividerOptionKey = typeof dividerOptionKeys[number];
