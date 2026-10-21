// Training: connects anonymously to a Twitch chat and prints the parsed messages.
// Also answers the server PINGs, to check that the connection stays alive.
// Usage: node src/dev/tryChat.js nomdelachaine

import { parseFrame } from '../twitch/parseFrame.js';
import { fragmentFrame } from '../twitch/fragmentFrame.js';
import { getPongReply } from '../twitch/getPongReply.js';

// Channel name from the command line (Twitch channel names are lowercase)
const channel = process.argv[2].toLowerCase();

// Anonymous read-only nickname: "justinfan" followed by a random number
const nick = `justinfan${Math.floor(Math.random() * 90000) + 10000}`;

const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

socket.onopen = () => {
    console.log('Connecté, identification…');
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
            console.log(`>>> PONG envoyé à ${new Date().toLocaleTimeString()}`);
        }

        // "001" = welcome: identification is complete, we can join the channel
        if (line.includes(' 001 ')) {
            console.log(`Rejoindre #${channel}…`);
            socket.send(`JOIN #${channel}\r\n`);
        }
    }

    // Real frames through the project's parser
    for (const message of parseFrame(event.data)) {
        console.log(`${message.displayName} (${message.userId}) : ${message.text}`);
    }
};

socket.onclose = () => {
    console.log(`>>> Connexion fermée à ${new Date().toLocaleTimeString()}`);
};