import { useKanban, type KanbanColumn } from "./KanbanContext";

const countNumCards = (board: Map<string, KanbanColumn>): number => {
    let count = 0;

    for (const column of board.values()) {
        count += column.cards.size
    }

    return count;
}

interface HeaderProps {
    title: string,
}

const Header = ({ title }: HeaderProps) => {
    const { board } = useKanban();
    const numCards = countNumCards(board);

    return (
        <div>
            <h1>{title}</h1>
            <p>{numCards} tasks</p>
        </div>
    )
}

export default Header