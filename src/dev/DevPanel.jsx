import {
    MSG_ACHAT,
    MSG_VENTE_ABONNE,
    MSG_MODO,
    MSG_PSEUDO_UNICODE,
    MSG_ACTION_ME,
    MSG_PREMIER,
    TRAME_MULTIPLE,
    BIENVENUE,
    PIEGES,
} from './twitch-fixtures.js';

// Each button sends a raw frame, exactly as the WebSocket would
const TEST_FRAMES = [
    { label: 'Léa achète 10', frame: MSG_ACHAT },
    { label: 'Tom vend tout', frame: MSG_VENTE_ABONNE },
    { label: 'Modo : solde', frame: MSG_MODO },
    { label: 'Pseudo unicode achète 5', frame: MSG_PSEUDO_UNICODE },
    { label: 'Léa /me achète 3', frame: MSG_ACTION_ME },
    { label: 'Message normal', frame: MSG_PREMIER },
    { label: 'Trame multiple', frame: TRAME_MULTIPLE },
    { label: 'Lignes techniques', frame: BIENVENUE },
    { label: 'Tous les pièges', frame: PIEGES.join('') },
];



/**
 * Development panel: injects fixture frames into the game, without Twitch.
 * @param {{ onFrame: (frame: string) => void }} props
 */

function DevPanel({ onFrame }) {
    return (
        <section>
            <h2>Panneau de dev</h2>
            {TEST_FRAMES.map((test) => (
                <button key={test.label} onClick={() => onFrame(test.frame)}>
                    {test.label}
                </button>
            ))}
        </section>
    );
}

export default DevPanel;