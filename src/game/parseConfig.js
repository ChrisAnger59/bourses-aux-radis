import { parseDuration } from './parseDuration.js';

// Used when the URL gives no valid duration
const DEFAULT_DURATION = 20;

/**
 * Reads the game settings from the URL query string.
 * @param {string} search - the part of the URL after "?", e.g. '?duree=8&dev=1'
 * @returns {{ durationMinutes: number, dev: boolean }}
 */
export function parseConfig(search) {
    const params = new URLSearchParams(search);

    return {
        durationMinutes: parseDuration(params.get('duree')) ?? DEFAULT_DURATION,
        dev: params.get('dev') === '1',
        // Twitch channel to listen to ('' = no chat, dev panel only)
        channel: (params.get('channel') ?? '').trim().toLowerCase(),
    };
}