/**
 * Builds the answer to a server PING, as required by the IRC protocol.
 * @param {string} line - a single IRC line, without the trailing "\r\n"
 * @returns {string|null} the PONG line to send back, or null if it isn't a PING
 */
export function getPongReply(line) {
    if (!line.startsWith('PING')) {
        return null;
    }

    // Send back exactly what followed "PING"
    return 'PONG' + line.slice('PING'.length);
}