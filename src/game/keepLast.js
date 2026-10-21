/**
 * Keeps only the last items of an array.
 * Never modifies the given array.
 * @param {Array} array
 * @param {number} count - how many items to keep
 * @returns {Array} a new array with at most `count` items
 */

export function keepLast(array, count) {
    if (count <= 0) {
        return [];
    }

    return array.slice(-count);
}