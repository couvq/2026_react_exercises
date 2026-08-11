import ActionButtons from "./action_btns"
import CounterHistory from "./history"
import Result from "./result"
import "./undoable_counter.css"

const UndoableCounter = () => {
    return (
        <div className="undoable_counter">
            <ActionButtons />
            <Result />
            <CounterHistory />
        </div>
    )
}

export default UndoableCounter