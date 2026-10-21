import { fragmentFrame } from './fragmentFrame.js';
import { getPongReply } from './getPongReply.js';
import { isReconnectRequest } from './isReconnectRequest.js';

const CHAT_URL = 'wss://irc-ws.chat.twitch.tv:443';

// Delay before reopening a closed connection, in milliseconds
const RECONNECT_DELAY = 5000;

/**
 * Connects anonymously (read-only) to a Twitch channel's chat, and reconnects
 * automatically if the connection is lost. Every raw frame is passed to onFrame.
 * @param {string} channel - channel name, lowercase
 * @param {(frame: string) => void} onFrame - called with each raw frame
 * @returns {() => void} a stop function, which closes the connection for good
 */
export function connectChat(channel, onFrame) {
    let socket = null;
    // true once stop() has been called: no more reconnections
    let stopped = false;

    // Opens a new connection (called at start, then after each unexpected close)
    function open() {
        if (stopped) {
            return;
        }

        const nick = `justinfan${Math.floor(Math.random() * 90000) + 10000}`;
        socket = new WebSocket(CHAT_URL);

        socket.onopen = () => {
            socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands\r\n');
            socket.send('PASS SCHMOOPIIE\r\n');
            socket.send(`NICK ${nick}\r\n`);
        };

        socket.onmessage = (event) => {
            for (const line of fragmentFrame(event.data)) {
                // Keep-alive: Twitch closes the connection if a PING gets no PONG
                const pong = getPongReply(line);
                if (pong !== null) {
                    socket.send(`${pong}\r\n`);
                }

                // "001" = welcome: identification is complete, we can join the channel
                if (line.includes(' 001 ')) {
                    socket.send(`JOIN #${channel}\r\n`);
                }

                // Server maintenance: close now, onclose will reconnect
                if (isReconnectRequest(line)) {
                    socket.close();
                }
            }

            // Every frame goes to the game (chat messages are filtered later by parseFrame)
            onFrame(event.data);
        };

        socket.onclose = () => {
            // Closed on purpose by stop(): do nothing
            if (stopped) {
                return;
            }
            console.info(`Chat déconnecté, reconnexion dans ${RECONNECT_DELAY / 1000} s…`);
            setTimeout(open, RECONNECT_DELAY);
        };
    }

    open();

    return function stop() {
        stopped = true;
        socket.close();
    };
}