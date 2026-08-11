import { useCounterDispatch } from "./CounterContext";

const ActionButtons = () => {
    const dispatch = useCounterDispatch();

    return (
        <div className="action_buttons">
            <button>Undo</button>
            <button>Redo</button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        </div>
    )
}

export default ActionButtons