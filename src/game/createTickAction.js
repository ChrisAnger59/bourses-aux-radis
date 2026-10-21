/**
 * Creates a 'tick' action with fresh random numbers.
 * This is the only place where Math.random() is called: the reducer stays pure.
 * @returns {{ type: 'tick', randoms: Object }}
 */

export function createTickAction() {
    return {
        type: 'tick',
        randoms: {
            price: Math.random(),
            trend: Math.random(),
            duration: Math.random(),
            eventChance: Math.random(),
            eventPick: Math.random()
        }
    };
}