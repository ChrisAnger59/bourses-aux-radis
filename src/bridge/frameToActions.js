import { parseFrame } from '../twitch/parseFrame.js';
import { parseCommand } from '../game/parseCommand.js';


/**
 * Turns a raw Twitch frame into game actions.
 * This is the bridge between twitch/ (which knows nothing about the game)
 * and game/ (which knows nothing about Twitch).
 * @param {string} frame - raw content received from the WebSocket (or from the dev panel)
 * @returns {Array<{ type: 'command', userId: string, displayName: string, command: Object }>}
 */

export function frameToActions(frame) {
    const actions = [];

    for (const message of parseFrame(frame)) {
        const command = parseCommand(message.text);

        // Regular chat message or invalid command: ignored
        if (command === null) {
            continue;
        }

        actions.push({
            type: 'command',
            userId: message.userId,
            displayName: message.displayName,
            command
        });
    }

    return actions;
}