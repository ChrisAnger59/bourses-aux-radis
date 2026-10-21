/**
 * Picks a new market trend at random, each one with a 1 in 3 chance.
 * The randomness is passed as a parameter so the function stays testable.
 * @param {number} random - a number between 0 (included) and 1 (excluded), e.g. Math.random()
 * @returns {'up'|'down'|'stable'}
 */

export function pickTrend(random) {
    if (random < 1 / 3) {
        return 'up';
    }

    if (random < 2 / 3) {
        return 'down';
    }

    return 'stable';
}