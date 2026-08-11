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
};

export type UndoableCounterAction =
    | { type: 'math'; operation: '+' | '-' | 'x' | '/'; value: number };

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
                result,
                history: [...state.history, { operation: action.operation, appliedValue: action.value, oldValue: state.result, newValue: result }],
            }
        default:
            throw new Error(`Unknown action: ${JSON.stringify(action)}`);
    }
}

const initialState: UndoableCounterState = {
    result: 0,
    history: [],
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