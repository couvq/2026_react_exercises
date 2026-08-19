import Header from "./Header"
import { KanbanProvider } from "./KanbanContext"

interface KanbanProps {
    title: string,
}

const Kanban = ({ title }: KanbanProps) => {
    return (
        <KanbanProvider>
            <div>
                <Header title={title} />
            </div>
        </KanbanProvider>
    )
}

export default Kanban