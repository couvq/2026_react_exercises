import { useCounter, useCounterDispatch } from "./CounterContext";

const ActionButtons = () => {
    const dispatch = useCounterDispatch();
    const { history, undoStack } = useCounter();

    return (
        <div className="action_buttons">
            <button onClick={() => dispatch({ type: 'undo' })} disabled={history.length === 0}>
                Undo
            </button>
            <button onClick={() => dispatch({ type: 'redo' })} disabled={undoStack.length === 0}>
                Redo
            </button>
            <button onClick={() => dispatch({ type: 'reset' })} disabled={history.length === 0}>
                Reset
            </button>
        </div>
    )
}

export default ActionButtons