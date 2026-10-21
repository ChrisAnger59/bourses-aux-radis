export const STARTING_BELLS = 10000;


/**
 * Makes sure a player exists, creating them with starting bells if needed.
 * Never modifies the given object.
 * @param {Object} players - players indexed by userId
 * @param {string} userId
 * @param {string} displayName
 * @returns {Object} the same object if the player exists, otherwise a new one
 */

export function ensurePlayer(players, userId, displayName) {

    // Case 1: new player -> create them with starting bells
    if (!players[userId]) {
        const copy = { ...players };
        copy[userId] = { displayName: displayName, bells: STARTING_BELLS, radish:0 };
        return copy;
    }

    // Case 2: same name -> nothing to change
    // (we know the player exists here, so reading displayName is safe)
    if (players[userId].displayName === displayName) {
        return players;
    }

    // Case 3: name changed -> copy the list AND the player, with the new name
    const copy = { ...players };
    copy[userId] = { ...players[userId], displayName: displayName };
    return copy;
}