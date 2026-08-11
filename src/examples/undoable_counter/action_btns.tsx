import { useCounter, useCounterDispatch } from "./CounterContext";

const ActionButtons = () => {
    const dispatch = useCounterDispatch();
    const {history} = useCounter();

    return (
        <div className="action_buttons">
            <button onClick={() => dispatch({ type: 'undo' })} disabled={history.length === 0}>
                Undo
            </button>
            <button>Redo</button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        </div>
    )
}

export default ActionButtons