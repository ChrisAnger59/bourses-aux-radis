import { getLeaderboard } from '../game/getLeaderboard.js';
import { countPlayers } from '../game/countPlayers.js';

/**
 * Displays the final results once the game is over.
 * @param {{ players: Object }} props - players indexed by userId
 */
export function EndScreen({ players }) {
    const podium = getLeaderboard(players, 3);

    // Nobody played during the break
    if (podium.length === 0) {
        return (
            <section>
                <h2>Fin de la partie</h2>
                <p>Personne n'a joué cette fois-ci… À la prochaine pause !</p>
            </section>
        );
    }

    const winner = podium[0];

    return (
        <section>
            <h2>🏆 {winner.displayName} remporte la partie avec {winner.bells} 🔔 !</h2>
            <ol>
                {podium.map((player) => (
                    <li key={player.userId}>
                        {player.displayName} : {player.bells} 🔔
                    </li>
                ))}
            </ol>
            <p>{countPlayers(players)} participant(s)</p>
        </section>
    );
}