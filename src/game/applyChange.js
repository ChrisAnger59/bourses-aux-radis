import { clampPrice } from "./clampPrice.js";

/**
 * Applies a percentage change to a price, then keeps it within bounds.
 * @param {number} price - current price
 * @param {number} percent - e.g. 10 for +10%, -40 for -40%
 * @returns {number} the new price, rounded and clamped
 */

export function applyChange(price, percent) {
    const newPrice = price * (1 + percent / 100);
    return clampPrice(newPrice);
}