import Card from "./Card";
import { useKanbanDispatch } from "./hooks";
import { type KanbanCard, type NewCardPayload } from "./KanbanContext";

interface ColumnProps {
    columnTitle: string;
    cards: Map<string, KanbanCard>;
}

const Column = ({ columnTitle, cards }: ColumnProps) => {
    const dispatch = useKanbanDispatch();
    const flattenedCards = [...cards.entries()].map(([title, card]) => ({ title, ...card }));

    const handleAddCardClick = () => {
        // TODO: Hardcoded values for now, need to add a form to get these values from the user
        const newCard: NewCardPayload = {
            title: `New Task ${flattenedCards.length + 1}`,
            priority: 'medium',
            date: '2024-06-04',
            assignee: 'David'
        };
        dispatch({ type: 'addCard', newCard, columnTitle });
    }

    return (
        <div className="kanban_column">
            <h2>{columnTitle}</h2>
            <div className="kanban_cards">
                {flattenedCards.map((card) => (
                    <Card key={card.title} title={card.title} priority={card.priority} date={card.date} assignee={card.assignee} />
                ))}
            </div>
            <button onClick={handleAddCardClick}>Add Card</button>
        </div>
    )
}

export default Column