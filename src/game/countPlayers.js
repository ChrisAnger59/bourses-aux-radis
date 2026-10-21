/**
 * Counts the registered players.
 * @param {Object} players - players indexed by userId
 * @returns {number}
 */

export function countPlayers(players) {
    return Object.keys(players).length;
}