/**
 * Compare a value to the expected one and logs ✅ or ❌.
 * Uses JSON.stringify so that arrays and objects can be compared by content
 * (=== would only compare references).
 */


export function check(name, get, expected) {
    const ok = JSON.stringify(get) === JSON.stringify(expected);
    console.log(ok ? '✅' : '❌', name);

    if (!ok) {
        console.log('   attendu: ', expected, '\n obtenu: ',get);
    }
}