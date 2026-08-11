
const Result = () => {
    return (
        <div className="result">
            <div className="btn_grouping">
                <button>{'/2'}</button>
                <button>{'-1'}</button>
            </div>
            <div>{0}</div>
            <div className="btn_grouping">
                <button>{'+1'}</button>
                <button>{'*2'}</button>
            </div>
        </div>
    )
}

export default Result