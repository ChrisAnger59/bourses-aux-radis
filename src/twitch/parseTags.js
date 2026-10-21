/**
 * Converts a Twitch tags string into an object.
 * @param {string} tagsString - e.g. 'display-name=Lea;user-id=98'
 * @returns {Object<string, string>} e.g. { 'display-name': 'Lea', 'user-id': '98' }
 */

export function parseTags(tagsString) {
    const result = {};

    // No tags : nothing to parse
    if (tagsString === '') {
        return {}
    }

    for (const pair of tagsString.split(';')) {

        // indexOf instead of split('='): only the FIRST "=" separates key and value
        const equalPos = pair.indexOf('=');

        // Malformed pair (empty or without "="): skip it
        if (equalPos === -1) {
            continue;
        }
        
        const key = pair.slice(0, equalPos)

        // Twitch escapes spaces in tag values as "\s"
        const value = pair.slice(equalPos + 1).replaceAll('\\s', ' ');

        result[key] = value;
    }

    return result
}