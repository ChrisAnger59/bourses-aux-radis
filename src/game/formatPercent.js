/**
 * Formats a percentage with its sign, e.g. 50 → "+50 %", -40 → "-40 %".
 * @param {number} percent
 * @returns {string}
 */
export function formatPercent(percent) {
    // Negative numbers already carry their "-" sign: only positives need a "+"
    const sign = percent > 0 ? '+' : '';
    return `${sign}${percent} %`;
}