/**
 * Splits a chat message into lowercase words, ignoring extra spaces.
 * @param {string} text
 * @returns {string[]}
 */

export function splitWords(text) {
    const words = text.trim().toLowerCase().split(' ');

    // Several spaces in a row produce empty strings: remove them
    return words.filter((word) => word !== '');
}