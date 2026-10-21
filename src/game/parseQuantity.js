const MAX_QUANTITY = 10000;


/**
 * Converts a word into a valid quantity.
 * @param {string} word - e.g. '10'
 * @returns {number|null} a positive integer up to MAX_QUANTITY, or null
 */

export function parseQuantity(word) {
    const n = Number(word);

    // Rejects NaN ('dix', '10abc', undefined) and decimals ('1.5')
    if (!Number.isInteger(n)) {
        return null;
    }

    // Rejects negatives and zero (including Number('') which gives 0)
    if (n <= 0) {
        return null;
    }

    // Rejects absurd amounts
    if (n > MAX_QUANTITY) {
        return null;
    }

    return n;
}