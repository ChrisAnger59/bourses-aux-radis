export const MIN_PRICE = 10;
export const MAX_PRICE = 600;


/**
 * Rounds a price and keeps it between MIN_PRICE and MAX_PRICE.
 * @param {number} price - any price, possibly decimal or out of range
 * @returns {number} an integer between MIN_PRICE and MAX_PRICE
 */

export function clampPrice(price) {
    const rounded = Math.round(price);
    
    if (rounded < MIN_PRICE) {
        return MIN_PRICE;
    }

    if (rounded > MAX_PRICE) {
        return MAX_PRICE;
    }

    return rounded;
}