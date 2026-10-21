/**
 * Builds the ranking: richest players first.
 * Never modifies the given object.
 * @param {Object} players - players indexed by userId
 * @param {number} limit - maximum number of players to return
 * @returns {Array<{ userId: string, displayName: string, bells: number, turnips: number }>}
 */

export function getLeaderboard(players, limit) {

    // 1. Object → array, keeping the userId in each player (needed later by React)
    const list = [];
    for (const [userId, player] of Object.entries(players)) {
        list.push({ userId, ...player });
    }

    // 2. Richest first (sort modifies the array, but it's our own new array)
    list.sort((a, b) => b.bells - a.bells);

    // 3. Keep only the best ones
    return list.slice(0, limit);
}