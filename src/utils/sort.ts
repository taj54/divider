/**
 * Returns a new array of numbers sorted in ascending order.
 *
 * This function creates a shallow copy of the input array to avoid
 * mutating the original array.
 *
 * @example
 * sortAscending([3, 1, 2])
 * // => [1, 2, 3]
 *
 * @param numbers - The array of numbers to sort.
 * @returns A new array sorted in ascending numerical order.
 */
export function sortAscending(numbers: number[]): number[] {
  return [...numbers].sort((a, b) => a - b);
}
