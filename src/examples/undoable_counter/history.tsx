import { useCounter } from "./CounterContext";

const CounterHistory = () => {
    const { history } = useCounter();

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Operation</th>
                        <th>Old</th>
                        <th>New</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.operation}{entry.appliedValue}</td>
                            <td>{entry.oldValue}</td>
                            <td>{entry.newValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CounterHistory