/**
 * Splits a Twitch PRIVMSG line (with tags) into its main parts.
 * @param {string} line - a single IRC line, without the trailing "\r\n"
 * @returns {{ tags: string, command: string, text: string }}
 */

export function extractParts(row) {

    // 1. Tags: from after the "@" to the first space (tag values never contain spaces)
    const firstSpace = row.indexOf(' ');
    const tags = row.slice(1, firstSpace);

    // 2. The rest of the line, without the tags
    const rest = row.slice(firstSpace + 1)

    // 3. Command: second word of the rest (the first one is the prefix)
    const command = rest.split(' ')[1];


    // 4. Text: after the first " :" of the rest.
    // The prefix starts with ":" but has no space before it, so it can't match.
    // Using the FIRST occurrence keeps any " :" inside the text intact.
    const textStart = rest.indexOf(' :');
    const text = rest.slice(textStart +2).trim();

    return { tags, command, text }
}