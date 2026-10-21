import { getLeaderboard } from "./getLeaderboard.js";
import { countPlayers } from "./countPlayers.js";


/**
 * Finds a player's position in the full ranking (1 = richest).
 * @param {Object} players - players indexed by userId
 * @param {string} userId
 * @returns {number|null} the position, or null if the player doesn't exist
 */

export function getRank(players, userId) {
    const ranking = getLeaderboard(players, countPlayers(players));
    const index = ranking.findIndex((player) => player.userId === userId);

    // findIndex returns -1 when nothing matches
    if (index === -1) {
        return null;
    }

    // Indexes start at 0, positions start at 1
    return index + 1;

}