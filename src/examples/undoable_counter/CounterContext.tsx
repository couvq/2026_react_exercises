import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";

type HistoryEntry = {
    operation: '+' | '-' | 'x' | '/';
    appliedValue: number;
    oldValue: number;
    newValue: number;
};

export type UndoableCounterState = {
    result: number;
    history: HistoryEntry[];
    undoStack: HistoryEntry[];
};

export type UndoableCounterAction =
    | { type: 'math'; operation: '+' | '-' | 'x' | '/'; value: number } | { type: 'reset' } | { type: 'undo' } | { type: 'redo' };

const UndoableCounterContext = createContext<UndoableCounterState | null>(null);
const UndoableCounterDispatchContext = createContext<Dispatch<UndoableCounterAction> | null>(null);

const undoableCounterReducer = (state: UndoableCounterState, action: UndoableCounterAction): UndoableCounterState => {
    switch (action.type) {
        case 'math':
            const calculateResult = (operation: '+' | '-' | 'x' | '/', currentValue: number, value: number): number => {
                switch (operation) {
                    case '+':
                        return currentValue + value;
                    case '-':
                        return currentValue - value;
                    case 'x':
                        return currentValue * value;
                    case '/':
                        if (value === 0) {
                            throw new Error("Division by zero is not allowed.");
                        }
                        return currentValue / value;
                    default:
                        throw new Error(`Unknown operation: ${operation}`);
                }
            }
            const result = calculateResult(action.operation, state.result, action.value);
            return {
                ...state,
                result,
                history: [...state.history, { operation: action.operation, appliedValue: action.value, oldValue: state.result, newValue: result }],
            }
        case 'reset':
            return {
                result: 0,
                history: [],
                undoStack: [],
            }
        case 'undo':
            if (state.history.length === 0) {
                throw new Error("No actions to undo.");
            }
            return {
                result: state.history[state.history.length - 1].oldValue,
                history: state.history.slice(0, -1),
                undoStack: [...state.undoStack, state.history[state.history.length - 1]],
            }
        case 'redo':
            if (state.undoStack.length === 0) {
                throw new Error("No actions to redo.");
            }
            return {
                result: state.undoStack[state.undoStack.length - 1].newValue,
                history: [...state.history, state.undoStack[state.undoStack.length - 1]],
                undoStack: state.undoStack.slice(0, -1),
            }
        default:
            throw new Error(`Unknown action: ${JSON.stringify(action)}`);
    }
}

const initialState: UndoableCounterState = {
    result: 0,
    history: [],
    undoStack: [],
};


export const UndoableCounterProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(undoableCounterReducer, initialState);
    return (
        <UndoableCounterContext value={state}>
            <UndoableCounterDispatchContext value={dispatch}>
                {children}
            </UndoableCounterDispatchContext>
        </UndoableCounterContext>
    )
}

export const useCounter = () => {
    const context = useContext(UndoableCounterContext);
    if (context === null) {
        throw new Error("useCounter must be used within a UndoableCounterProvider");
    }
    return context;
}

export const useCounterDispatch = () => {
    const context = useContext(UndoableCounterDispatchContext);
    if (context === null) {
        throw new Error("useCounterDispatch must be used within a UndoableCounterProvider");
    }
    return context;
}