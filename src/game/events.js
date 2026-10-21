import { applyChange } from './applyChange.js'

// Random market events. Replace or add messages with the channel's private jokes!
export const EVENTS = [
    { message: "Les radis sont à la mode !!", percent: 50 },
    { message: "Babouin a arrosé les radis, leur valeur baisse...", percent: -25},
    { message: "Kéké Laglisse promeut les radis pendant son concert !!", percent: 30},
    { message: "Nouvelle rumeur: les radis donnent des boutons...", percent: -40}
];


/**
 * Picks a random event from the list.
 * @param {number} random - a number between 0 (included) and 1 (excluded), e.g. Math.random()
 * @returns {{ message: string, percent: number }}
 */

export function pickEvent(random) {
    const index = Math.floor(random * EVENTS.length);
    return EVENTS[index];
}


/**
 * Applies an event to the market: only the price changes.
 * Never modifies the given market.
 * @param {{ price: number, trend: string, ticksLeft: number }} market
 * @param {{ message: string, percent: number }} event
 * @returns {{ price: number, trend: string, ticksLeft: number }} the new market
 */

export function applyEvent(market, event) {
    return {
        ...market,
        price: applyChange(market.price, event.percent)
    };
}