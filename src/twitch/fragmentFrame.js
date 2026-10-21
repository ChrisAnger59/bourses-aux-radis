/**
 * Splits a raw Twitch WebSocket frame into IRC lines.
 * @param {string} frame - raw content received from the WebSocket
 * @returns {string[]} array of non-empty lines
 */


export function fragmentFrame(frame) {
    const rows = frame.split('\r\n');

    // Every frame ends with "\r\n", so split() leaves an empty string at the end.
    return rows.filter((row) => row !== '');
}