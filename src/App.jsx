import { useReducer, useEffect } from 'react';

// Game logic
import { gameReducer } from './game/gameReducer.js';
import { createInitialState } from './game/createInitialState.js';
import { createTickAction } from './game/createTickAction.js';
import { parseConfig } from './game/parseConfig.js';

// Twitch chat
import { connectChat } from './twitch/connectChat.js';
import { frameToActions } from './bridge/frameToActions.js';

// Display
import { GameHeader } from './components/GameHeader.jsx';
import { EventBanner } from './components/EventBanner.jsx';
import { PlayerList } from './components/PlayerList.jsx';
import { ActivityFeed } from './components/ActivityFeed.jsx';
import { CommandsReminder } from './components/CommandsReminder.jsx';
import { EndScreen } from './components/EndScreen.jsx';

// ─── Settings ──────────────────────────────────────────────────────────────────

// Delay between two market ticks, in milliseconds
const TICK_DELAY = 20000;

// Game settings read once from the URL, e.g. ?channel=name&duree=8&dev=1
const CONFIG = parseConfig(window.location.search);

// ─── Component ─────────────────────────────────────────────────────────────────

function App() {
    const [state, dispatch] = useReducer(gameReducer, createInitialState(CONFIG.durationMinutes * 60));

    // Single entry point: every frame goes through here,
    // whether it comes from the dev panel or from the Twitch chat
    function handleFrame(frame) {
        for (const action of frameToActions(frame)) {
            dispatch(action);
        }
    }

    // Market ticks
    useEffect(() => {
        const id = setInterval(() => dispatch(createTickAction()), TICK_DELAY);
        return () => clearInterval(id);
    }, []);

    // Game timer: one 'second' action per second
    useEffect(() => {
        const id = setInterval(() => dispatch({ type: 'second' }), 1000);
        return () => clearInterval(id);
    }, []);

    // Twitch chat (only if a channel is given in the URL)
    useEffect(() => {
        if (CONFIG.channel === '') {
            return;
        }
        const stop = connectChat(CONFIG.channel, handleFrame);
        return () => stop();
    }, []);

    return (
        <main className="game">
            {state.phase === 'ended' ? (
                <EndScreen players={state.players} />
            ) : (
                <>
                    <GameHeader price={state.market.price} secondsLeft={state.secondsLeft} />
                    <EventBanner event={state.currentEvent} />

                    <div className="game-columns">
                        <PlayerList players={state.players} />
                        <ActivityFeed feed={state.feed} />
                    </div>

                    

                    <CommandsReminder />
                </>
            )}
        </main>
    );
}

export default App;