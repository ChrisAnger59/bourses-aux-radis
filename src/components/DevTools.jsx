import { DevPanel } from '../dev/DevPanel.jsx';

/**
 * Development tools, shown only with ?dev=1 in the URL.
 * @param {{ state: Object, onTick: () => void, onEnd: () => void, onFrame: (frame: string) => void }} props
 */
export function DevTools({ state, onTick, onEnd, onFrame }) {
    return (
        <div className="dev-tools">
            <button onClick={onTick}>Tick</button>
            <button onClick={onEnd}>Fin de partie</button>
            <DevPanel onFrame={onFrame} />
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
    );
}