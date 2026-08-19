import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";

export interface KanbanCard {
    title: string,
    priority: 'low' | 'medium' | 'high',
    date: string,
    assignee: string,
}

export interface KanbanColumn {
    cards: Map<string, KanbanCard>
}

export interface KanbanState {
    board: Map<string, KanbanColumn>
}

export type KanbanAction = {
    type: 'PLACEHOLDER';
};

const kanbanReducer = (state: KanbanState, action: KanbanAction): KanbanState => {
    switch (action.type) {
        case 'PLACEHOLDER':
            return state;
        default:
            throw new Error(`Unknown action: ${JSON.stringify(action)}`);
    }
}

const initialState: KanbanState = {
    board: new Map<string, KanbanColumn>([
        ['To Do', {
            cards: new Map<string, KanbanCard>([
                ['task-1', { title: 'Task 1', priority: 'high', date: '2024-06-01', assignee: 'Alice' }],
                ['task-2', { title: 'Task 2', priority: 'medium', date: '2024-06-02', assignee: 'Bob' }],
                ['task-3', { title: 'Task 3', priority: 'low', date: '2024-06-03', assignee: 'Charlie' }]
            ])
        }],
        ['In Progress', { cards: new Map<string, KanbanCard>() }],
        ['Done', { cards: new Map<string, KanbanCard>() }],
    ]),
};

const KanbanContext = createContext<KanbanState | null>(null);
const KanbanDispatchContext = createContext<Dispatch<KanbanAction> | null>(null);

export const KanbanProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(kanbanReducer, initialState);

    return (
        <KanbanContext value={state}>
            <KanbanDispatchContext value={dispatch}>
                {children}
            </KanbanDispatchContext>
        </KanbanContext>
    );
}

export const useKanban = () => {
    const context = useContext(KanbanContext);
    if (context === null) {
        throw new Error("useKanban must be used within a KanbanProvider");
    }
    return context;
}

export const useKanbanDispatch = () => {
    const context = useContext(KanbanDispatchContext);
    if (context === null) {
        throw new Error("useKanbanDispatch must be used within a KanbanProvider");
    }
    return context;
}