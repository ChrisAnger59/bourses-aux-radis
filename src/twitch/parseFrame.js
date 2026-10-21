import { fragmentFrame } from './fragmentFrame.js'
import { extractParts } from './extractParts.js'
import { parseTags } from './parseTags.js'
import { cleanText } from './cleanText.js'


/**
 * Turns a raw Twitch WebSocket frame into a list of chat messages.
 * Technical lines (welcome, JOIN, ROOMSTATE, PING…) are ignored.
 * @param {string} frame - raw content received from the WebSocket
 * @returns {{ userId: string, displayName: string, text: string }[]}
 */

export function parseFrame(frame) {
    const message = [];

    for (const line of fragmentFrame(frame)) {
        // extractParts only handles lines with tags
        if (!line.startsWith('@')) {
            continue
        }

        const parts = extractParts(line);

        // Only chat messages matter for the game
        if (parts.command !== 'PRIVMSG') {
            continue
        }

        const tags = parseTags(parts.tags)

        message.push({
            userId: tags['user-id'],
            displayName: tags['display-name'],
            text: cleanText(parts.text)
        })
    }

    return message
}