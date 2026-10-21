import { tickMarket } from './tickMarket.js';
import { pickEvent, applyEvent } from './events.js';

// Chance that an event happens on a given tick (10%)
const EVENT_CHANCE = 0.1;


/**
 * Moves the game forward by one tick: market update and possible random event.
 * The random numbers are given in the action so the function stays pure.
 * @param {Object} state - current game state
 * @param {{ randoms: { price: number, trend: number, duration: number, eventChance: number, eventPick: number } }} action
 * @returns {Object} the new game state
 */

export function handleTick(state, action) {

    // The market is frozen once the game is over
    if (state.phase !== 'playing') {
        return state;
    }

    const { randoms } = action;

    // 1. Regular market move
    let market = tickMarket(state.market, randoms.price, randoms.trend, randoms.duration);

    // 2. Possible random event, applied on top of the regular move
    let currentEvent = null;
    if (randoms.eventChance < EVENT_CHANCE) {
        currentEvent = pickEvent(randoms.eventPick);
        market = applyEvent(market, currentEvent);
    }

    return {
        ...state,
        market,
        // 3. Price history for the chart
        priceHistory: [...state.priceHistory, market.price],
        // 4. Event banner: shown for this tick only (null clears the previous one)
        currentEvent
    };
}