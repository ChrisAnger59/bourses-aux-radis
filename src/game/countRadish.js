/**
 * Adds up the turnips of all players.
 * @param {Object} players - players indexed by userId
 * @returns {number} total number of turnips
 */

export function countRadish(players) {
    let total = 0;

    for (const player of Object.values(players)) {
        total = total + player.radish;
    }

    return total;
}