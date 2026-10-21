import { handleCommand } from "./handleCommand.js";
import { handleTick } from "./handleTick.js";
import { handleEnd } from './handleEnd.js';
import { handleSecond } from "./handleSecond.js";


/**
 * The game reducer: (current state, action) → new state.
 * @param {Object} state - current game state
 * @param {{ type: string }} action - what just happened
 * @returns {Object} the new game state
 */

export function gameReducer(state, action) {
    switch (action.type) {
        case 'command':
            return handleCommand(state, action);
        case 'tick':
            return handleTick(state, action);
        case 'end':
            return handleEnd(state);
        case 'second':
            return handleSecond(state);
        default:
            // Unknown action: nothing changes
            return state;
    }
}