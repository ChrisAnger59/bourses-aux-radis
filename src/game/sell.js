
/**
 * Sells turnips for a player at the current price.
 * Never modifies the given player.
 * @param {{ displayName: string, bells: number, radish: number }} player
 * @param {number|'all'} quantity - a positive integer, or 'all' for "!vente tout"
 * @param {number} price - current price of one radish
 * @returns {Object} a new player, or the same one if the sale is impossible
 */

export function sell(player, quantity, price) {

    // How many turnips are actually sold: 'all' means the whole stock
    const toSell = quantity === "all" ? player.radish : quantity;

    // Nothing to sell (e.g. "!vente tout" with an empty stock)
    if (toSell === 0) {
        return player;
    }

    // Not enough turnips
    if (toSell > player.radish) {
        return player;
    }

    const earnings = toSell * price;

    return {
        ...player,
        bells: player.bells + earnings,
        radish: player.radish - toSell
    };
}