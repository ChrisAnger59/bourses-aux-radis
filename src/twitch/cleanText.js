const ACTION_START = '\u0001ACTION ';
const ACTION_END = '\u0001';


/**
 * Removes the invisible markers added by Twitch when a message is sent with /me.
 * @param {string} text - raw message text
 * @returns {string} text without the /me markers
 */
export function cleanText(text) {
    if (text.startsWith(ACTION_START) && text.endsWith(ACTION_END)) {
        return text.slice(ACTION_START.length, -ACTION_END.length)
    }

    return text
}