import { useKanban, type KanbanColumn } from "./KanbanContext";

const countNumCards = (columns: Map<string, KanbanColumn>): number => {
    let count = 0;

    for (const column of columns.values()) {
        count += column.cards.size
    }

    return count;
}

interface HeaderProps {
    title: string,
}

const Header = ({ title }: HeaderProps) => {
    const { columns } = useKanban();
    const numCards = countNumCards(columns);

    return (
        <div>
            <h1>{title}</h1>
            <p>{numCards} tasks</p>
        </div>
    )
}

export default Header