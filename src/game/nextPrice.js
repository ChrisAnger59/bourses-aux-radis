import { applyChange } from "./applyChange.js";

// Percentage range of each tick, depending on the trend
const TREND_RANGES = {
    up: { min: 3, max: 15 },
    down: { min: -15, max: -3 },
    stable: { min: -3, max: 3 }
};


/**
 * Computes the next price according to the current trend.
 * The randomness is passed as a parameter so the function stays testable.
 * @param {number} price - current price
 * @param {'up'|'down'|'stable'} trend - current market trend
 * @param {number} random - a number between 0 (included) and 1 (excluded), e.g. Math.random()
 * @returns {number} the next price, rounded and clamped
 */

export function nextPrice(price, trend, random) {
    const range = TREND_RANGES[trend];
    const percent = range.min + random * (range.max - range.min);
    return applyChange(price, percent)
}