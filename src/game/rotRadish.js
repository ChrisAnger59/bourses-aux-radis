/**
 * End of game: unsold radish rot, every player ends with 0 radish.
 * Bells are kept. Never modifies the given object.
 * @param {Object} players - players indexed by userId
 * @returns {Object} a new players object
 */

export function rotRadish(players) {
    const result = {};

    for (const [userId, player] of Object.entries(players)) {
        result[userId] = { ...player, radish: 0};
    }

    return result;
}