import Card from "./Card";
import type { KanbanCard } from "./KanbanContext";

interface ColumnProps {
    columnTitle: string;
    cards: Map<string, KanbanCard>;
}

const Column = ({ columnTitle, cards }: ColumnProps) => {
    const flattenedCards = [...cards.entries()].map(([title, card]) => ({ title, ...card }));

    return (
        <div className="kanban_column">
            <h2>{columnTitle}</h2>
            <div className="kanban_cards">
                {flattenedCards.map((card) => (
                    <Card key={card.title} title={card.title} priority={card.priority} date={card.date} assignee={card.assignee} />
                ))}
            </div>
        </div>
    )
}

export default Column