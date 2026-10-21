/**
 * Creates the state of a brand new game.
 * @returns {Object} the initial game state
 */


export const GAME_DURATION = 20 * 60;

export function createInitialState(duration = GAME_DURATION) {
    return {
        phase: 'playing',
        secondsLeft: duration,
        market: {price: 100, trend: 'stable', ticksLeft: 0 },
        priceHistory: [100],
        players: {},
        feed: [],
        currentEvent: null
    };
}