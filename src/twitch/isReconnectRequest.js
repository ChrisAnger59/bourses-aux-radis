/**
 * Tells whether a line is Twitch asking the client to reconnect (server maintenance).
 * @param {string} line - a single IRC line, without the trailing "\r\n"
 * @returns {boolean}
 */
export function isReconnectRequest(line) {
    return line === ':tmi.twitch.tv RECONNECT';
}