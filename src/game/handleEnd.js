import { rotRadish } from './rotRadish.js';
import { countRadish } from './countRadish.js';
import { keepLast } from './keepLast.js';
import { FEED_SIZE } from './handleCommand.js';

/**
 * Ends the game: the game is frozen and unsold turnips rot.
 * Never modifies the given state.
 * @param {Object} state - current game state
 * @returns {Object} the new game state
 */

export function handleEnd(state) {

    // Already over: nothing to do
    if (state.phase !== 'playing') {
        return state;
    }

    // Count BEFORE rotting: afterwards, everyone has 0 turnips
    const rotten = countRadish(state.players);

    let message;

    if (rotten === 0) {
        message = 'Aucun radis n\'a pourri, bien joué !';
    } else if (rotten === 1) {
        message = '1 radis a pourri...';
    } else {
        message = `${rotten} radis ont pourri...`;
    }

    return {
        ...state,
        phase: 'ended',
        players: rotRadish(state.players),
        currentEvent: null,
        feed: keepLast([...state.feed, message], FEED_SIZE)
    };
}