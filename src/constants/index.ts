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
