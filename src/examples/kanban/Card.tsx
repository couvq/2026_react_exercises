
interface CardProps {
    title: string,
    priority: 'low' | 'medium' | 'high',
    date: string,
    assignee: string,
}

const Card = ({ title, priority, date, assignee }: CardProps) => {
    return (
        <div key={title}>
            <h3>{title}</h3>
            <p>Priority: {priority}</p>
            <p>Date: {date}</p>
            <p>Assignee: {assignee}</p>
        </div>
    )
}

export default Card