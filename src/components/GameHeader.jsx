import { formatTime } from '../game/formatTime.js';

/**
 * Displays the title, the current price and the remaining time.
 * @param {{ price: number, secondsLeft: number }} props
 */
export function GameHeader({ price, secondsLeft }) {
    return (
        <header className="game-header">
            <h1>Bourse aux radis</h1>
            <div className="stats">
                <p className="stat">
                    <span className="stat-label">Cours</span>
                    <span className="stat-value">{price} 💰</span>
                </p>
                <p className="stat">
                    <span className="stat-label">Temps</span>
                    <span className="stat-value">{formatTime(secondsLeft)}</span>
                </p>
            </div>
        </header>
    );
}