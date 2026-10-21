/**
 * Formats a number of seconds as "minutes:seconds", e.g. 299 → "4:59".
 * @param {number} seconds - remaining time in seconds
 * @returns {string}
 */

export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;

    // Seconds always on two digits: 5 → "05"
    return `${minutes}:${String(rest).padStart(2, "0")}`;
}