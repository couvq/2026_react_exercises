import KanbanContent from "./KanbanContent"
import { KanbanProvider } from "./KanbanContext"
import './kanban.css'

interface KanbanProps {
    title: string,
}

const Kanban = ({ title }: KanbanProps) => {
    return (
        <KanbanProvider>
            <KanbanContent headerTitle={title} />
        </KanbanProvider>
    )
}

export default Kanban