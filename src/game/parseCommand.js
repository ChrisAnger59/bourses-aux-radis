import { splitWords } from "./splitWords.js";
import { parseQuantity } from "./parseQuantity.js";


/**
 * Converts a chat message into a game command.
 * @param {string} text - message text, already cleaned by parseFrame
 * @returns {{ type: string, quantity?: number|'all' } | null} the command, or null if invalid
 */

export function parseCommand(text) {
    const words = splitWords(text);

    if (words.length === 0) {
        return null;
    }

    const [name, argument] = words;
    
    switch (name) {

        case '!achat':
        case '!acheter':
        case '!achter':
        case '!buy': {
            if (argument === "tout") {
                return { type: "buy", quantity: "all" }
            }
            const quantity = parseQuantity(argument);
            return quantity === null ? null : { type: "buy", quantity };
        }

        case '!vente' :
        case '!vend':
        case '!vends':
        case '!vendre': {
            if (argument === "tout") {
                return { type: 'sell', quantity: "all" };
            }
            const quantity = parseQuantity(argument);
            return quantity === null ? null : { type: "sell", quantity };
        }

        default: {
            return null;
        }
    }

}