/**
 * Buys turnips for a player at the current price.
 * Never modifies the given player.
 * @param {{ displayName: string, bells: number, radish: number }} player
 * @param {number | 'all'} quantity - already validated by parseCommand (positive integer)
 * @param {number} price - current price of one turnip
 * @returns {Object} a new player, or the same one if they can't afford it
 */

export function buy(player, quantity, price) {

    const toBuy = quantity === "all" ? Math.floor(player.bells / price): quantity;

    if (toBuy === 0) {
        return player;
    }

    const cost = toBuy * price;

    // Not enough bells: the purchase is ignored
    if (cost > player.bells) {
        return player;
    }

    return {
        ...player,
        bells: player.bells - cost,
        radish: player.radish + toBuy
    };
}