import ActionButtons from "./action_btns"
import { UndoableCounterProvider } from "./CounterContext"
import CounterHistory from "./history"
import Result from "./result"
import "./undoable_counter.css"

const UndoableCounter = () => {
    return (
        <UndoableCounterProvider>
            <div className="undoable_counter">
                <ActionButtons />
                <Result />
                <CounterHistory />
            </div>
        </UndoableCounterProvider>
    )
}

export default UndoableCounter