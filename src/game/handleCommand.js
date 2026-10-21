import { ensurePlayer } from "./ensurePlayer.js";
import { buy } from "./buy.js";
import { sell } from "./sell.js";
import { keepLast } from "./keepLast.js";

// How many lines are kept in the activity feed (the screen only shows the latest ones)
export const FEED_SIZE = 5;

/**
 * Applies a player's command (buy, sell) to the game state.
 * Never modifies the given state.
 * @param {Object} state - current game state
 * @param {{ userId: string, displayName: string, command: Object }} action
 * @returns {Object} the new game state
 */
export function handleCommand(state, action) {
    // Commands are ignored once the game is over
    if (state.phase !== "playing") {
        return state;
    }

    const { userId, displayName, command } = action;

    // Any command registers the player (or updates their name)
    const players = ensurePlayer(state.players, userId, displayName);
    const player = players[userId];

    if (command.type === "buy") {
        const updated = buy(player, command.quantity, state.market.price);

        // Purchase refused (not enough bells): keep the registration, nothing else
        if (updated === player) {
            return { ...state, players };
        }

        // Real number bought (command.quantity may be 'all')
        const bought = updated.radish - player.radish;

        return {
            ...state,
            players: { ...players, [userId]: updated },
            feed: keepLast([...state.feed, `${displayName} achète ${bought} radis`], FEED_SIZE),
        };
    }

    if (command.type === "sell") {
        const updated = sell(player, command.quantity, state.market.price);

        // Sale refused (not enough radishes): keep the registration, nothing else
        if (updated === player) {
            return { ...state, players };
        }

        // Real number sold (command.quantity may be 'all')
        const sold = player.radish - updated.radish;

        return {
            ...state,
            players: { ...players, [userId]: updated },
            feed: keepLast([...state.feed, `${displayName} vend ${sold} radis`], FEED_SIZE),
        };
    }

    // Unknown command type: keep the registration, nothing else
    return { ...state, players };
}