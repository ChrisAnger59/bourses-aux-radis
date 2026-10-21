// Commands shown permanently: viewers arriving mid-game must know how to play
const COMMANDS = ['!achat 10', '!achat tout', '!vente 10', '!vente tout'];

/**
 * Displays the chat commands available to the players.
 */
export function CommandsReminder() {
    return (
        <footer className="commands">
            {COMMANDS.map((command) => (
                <code key={command}>{command}</code>
            ))}
        </footer>
    );
}