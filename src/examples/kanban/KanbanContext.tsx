import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";

export interface KanbanCard {
    priority: 'low' | 'medium' | 'high',
    date: string,
    assignee: string,
}

export interface KanbanColumn {
    cards: Map<string, KanbanCard> // card title -> card, card titles are unique within a column
}

export interface KanbanState {
    columns: Map<string, KanbanColumn> // column title -> column, column titles are unique
}

export interface NewCardPayload extends KanbanCard {
    title: string;
}

export type KanbanAction = {
    type: 'addCard';
    newCard: NewCardPayload;
    columnTitle: string;
}

const kanbanReducer = (state: KanbanState, action: KanbanAction): KanbanState => {
    switch (action.type) {
        case 'addCard':
            const { newCard, columnTitle } = action;
            const column = state.columns.get(columnTitle);
            if (!column) {
                throw new Error(`Column with title "${columnTitle}" does not exist.`);
            }

            const updatedCardsForColumn = new Map(column.cards);
            updatedCardsForColumn.set(newCard.title, {
                priority: newCard.priority,
                date: newCard.date,
                assignee: newCard.assignee
            });

            const updatedColumn: KanbanColumn = {
                ...column,
                cards: updatedCardsForColumn
            };

            const updatedColumns = new Map(state.columns);
            updatedColumns.set(columnTitle, updatedColumn);

            return {
                ...state,
                columns: updatedColumns
            };
            
        default:
            throw new Error(`Unknown action: ${JSON.stringify(action)}`);
    }
}

const initialState: KanbanState = {
    columns: new Map<string, KanbanColumn>([
        ['To Do', {
            cards: new Map<string, KanbanCard>([
                ['Task 1', { priority: 'high', date: '2024-06-01', assignee: 'Alice' }],
                ['Task 2', { priority: 'medium', date: '2024-06-02', assignee: 'Bob' }],
                ['Task 3', { priority: 'low', date: '2024-06-03', assignee: 'Charlie' }]
            ])
        }],
        ['In Progress', { cards: new Map<string, KanbanCard>() }],
        ['Done', { cards: new Map<string, KanbanCard>() }],
    ]),
};

export const KanbanContext = createContext<KanbanState | null>(null);
export const KanbanDispatchContext = createContext<Dispatch<KanbanAction> | null>(null);

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