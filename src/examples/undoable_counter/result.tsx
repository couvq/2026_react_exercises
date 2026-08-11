import { useCounter, useCounterDispatch } from "./CounterContext";

const Result = () => {
    const dispatch = useCounterDispatch();
    const { result } = useCounter();

    return (
        <div className="result">
            <div className="btn_grouping">
                <button onClick={() => dispatch({ type: 'math', operation: '/', value: 2 })}>{'/2'}</button>
                <button onClick={() => dispatch({ type: 'math', operation: '-', value: 1 })}>{'-1'}</button>
            </div>
            <div>{result}</div>
            <div className="btn_grouping">
                <button onClick={() => dispatch({ type: 'math', operation: '+', value: 1 })}>{'+1'}</button>
                <button onClick={() => dispatch({ type: 'math', operation: 'x', value: 2 })}>{'x2'}</button>
            </div>
        </div>
    )
}

export default Result