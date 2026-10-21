import { formatPercent } from '../game/formatPercent.js';


/**
 * Displays the current market event, if any.
 * @param {{ event: { message: string, percent: number } | null }} props
 */

export function EventBanner({ event }) {
    if (event === null) {
        return null;
    }

    return (
        <section className='event-banner'>
            <p>📰 {event.message} ({formatPercent(event.percent)})</p>
        </section>
    )
}