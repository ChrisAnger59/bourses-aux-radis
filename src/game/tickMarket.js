import { nextPrice } from "./nextPrice.js";
import { pickTrend } from "./pickTrend.js";
import { pickDuration } from "./pickDuration.js";


/**
 * Moves the market forward by one tick.
 * Never modifies the given market.
 * @param {{ price: number, trend: string, ticksLeft: number }} market
 * @param {number} randomPrice - random number in [0, 1) for the price variation
 * @param {number} randomTrend - random number in [0, 1) for picking a new trend
 * @param {number} randomDuration - random number in [0, 1) for the new trend's duration
 * @returns {{ price: number, trend: string, ticksLeft: number }} the new market
 */

export function tickMarket(market, randomPrice, randomTrend, randomDuration) {
    let trend = market.trend;
    let ticksLeft = market.ticksLeft;

    // The current trend is over: pick a new one, with a random duration
    if (ticksLeft === 0) {
        trend = pickTrend(randomTrend);
        ticksLeft = pickDuration(randomDuration);
    }

    return {
        price: nextPrice(market.price, trend, randomPrice),
        trend: trend,
        ticksLeft: ticksLeft - 1
    };
}