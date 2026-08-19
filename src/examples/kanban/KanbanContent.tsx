import Column from "./column"
import Header from "./Header"
import { useKanban } from "./hooks";

interface KanbanContentProps {
    headerTitle: string,
}

const KanbanContent = ({ headerTitle }: KanbanContentProps) => {
    const { columns } = useKanban();
    const flattenedColumns = [...columns.entries()].map(([title, column]) => ({ title, ...column }));

    return (
        <>
            <Header title={headerTitle} />
            <div className="kanban_board">
                {flattenedColumns.map((column) => (
                    <Column key={column.title} columnTitle={column.title} cards={column.cards} />
                ))}
            </div>
        </>
    )
}

export default KanbanContent