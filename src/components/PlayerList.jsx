import { getLeaderboard } from "../game/getLeaderboard.js";
import { countPlayers } from "../game/countPlayers.js";

export function PlayerList({ players }) {
    const ranking = getLeaderboard(players, countPlayers(players));

    return (
        <section>
            <h2>👥 Joueurs ({ranking.length})</h2>
            {ranking.length === 0 ? (
                <p>Tapez !achat 10 pour entrer dans la partie</p>
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