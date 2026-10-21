/**
 * Displays the latest players' actions.
 * @param {{ feed: string[] }} props - lines of the activity feed, oldest first
 */

export function ActivityFeed({ feed }) {

    const latestFirst = [...feed].reverse();
    return (
        <section>
            <h2>📢 Activité</h2>

            <ul>
                {latestFirst.map((line, index) => (
                    <li key={index}>{line}</li>
                ))}
            </ul>
        </section>
    );
}