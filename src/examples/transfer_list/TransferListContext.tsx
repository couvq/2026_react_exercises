import { act, createContext, useContext, useReducer, type ReactNode } from "react";
import type { Item } from "./types";

type ListState = {
    left: Item[];
    right: Item[];
}

const ListContext = createContext<ListState | null>(null);
const ListDispatchContext = createContext<React.Dispatch<ListAction> | null>(null);

type ListAction = {
    type: 'moveAllLeft';
} | {
    type: 'moveAllRight';
} | {
    type: 'moveSelectedLeft';
} | {
    type: 'moveSelectedRight';
} | {
    type: 'toggleSelect';
    label: string;
};

const listReducer = (state: ListState, action: ListAction): ListState => {
    switch (action.type) {
        case 'toggleSelect':
            return {
                left: state.left.map(item => item.label === action.label ? { ...item, isSelected: !item.isSelected } : item),
                right: state.right.map(item => item.label === action.label ? { ...item, isSelected: !item.isSelected } : item),
            }
        case 'moveAllLeft':
            return {
                left: [...state.left, ...state.right],
                right: [],
            };
        case 'moveAllRight':
            return {
                left: [],
                right: [...state.right, ...state.left]
            };
        case 'moveSelectedLeft':
            return {
                left: [...state.left, ...state.right.filter(item => item.isSelected)],
                right: state.right.filter(item => !item.isSelected)
            }
        case 'moveSelectedRight':
            return {
                left: state.left.filter(item => !item.isSelected),
                right: [...state.right, ...state.left.filter(item => item.isSelected)]
            }
        default:
            throw new Error(`Unknown action: ${action}`);
    }
}

const initialState: ListState = {
    left: [{ isSelected: false, label: "Item 1" }, { isSelected: false, label: "Item 2" }],
    right: [{ isSelected: false, label: "Item 3" }, { isSelected: false, label: "Item 4" }],
};

export const ListProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(listReducer, initialState);
    return (
        <ListContext value={state}>
            <ListDispatchContext value={dispatch}>
                {children}
            </ListDispatchContext>
        </ListContext>
    )
}

export const useList = () => useContext(ListContext);
export const useListDispatch = () => useContext(ListDispatchContext);