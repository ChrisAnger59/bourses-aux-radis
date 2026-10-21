/**
 * Picks how many ticks a new trend will last: 3 or 4, with equal chance.
 * @param {number} random - a number between 0 (included) and 1 (excluded), e.g. Math.random()
 * @returns {number} 3 or 4
 */

export function pickDuration(random) {

    if (random < 0.5) {
        return 3;
    }

    return 4;
}