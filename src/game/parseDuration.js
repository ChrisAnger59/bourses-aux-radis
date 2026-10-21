const MIN_DURATION = 1;
const MAX_DURATION = 20;


/**
 * Converts a URL value into a valid game duration.
 * @param {string} word - raw value read from the URL, e.g. '5'
 * @returns {number|null} minutes between MIN_DURATION and MAX_DURATION, or null
 */

export function parseDuration(word) {
    const n = Number(word);

    // Rejects NaN ('abc', undefined) and decimals ('2.5')
    if (!Number.isInteger(n)) {
        return null;
    }

    // Rejects values out of range (including Number('') which gives 0)
    if (n < MIN_DURATION || n > MAX_DURATION) {
        return null;
    }

    return n;
}