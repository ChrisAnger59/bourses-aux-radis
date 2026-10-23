import { getLeaderboard } from "../game/getLeaderboard.js";
import { countPlayers } from "../game/countPlayers.js";

export function PlayerList({ players }) {
    const ranking = getLeaderboard(players, countPlayers(players));

    return (
        <section>
            <h2>👥 Joueurs ({ranking.length})</h2>
            {ranking.length === 0 ? (
                <p>Chaque joueuse / joueur débute la partie avec 10.000 clochettes !</p>
            ) : (
                <ol>
                    {ranking.map((player) => (
                        <li key={player.userId}>
                            {player.displayName} : {player.bells} 🔔 · {player.radish} 🫜
                        </li>
                    ))}
                </ol>
            )}
        </section>
    );
}