import { handleEnd } from "./handleEnd.js";

export function handleSecond(state) {
    if (state.phase !== 'playing') {
        return state;
    }

    const secondsLeft = state.secondsLeft - 1;

    if (secondsLeft <= 0) {
    return handleEnd({...state, secondsLeft});
    }

    return { ...state, secondsLeft };
}