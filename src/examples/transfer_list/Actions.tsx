import { useListDispatch } from "./TransferListContext";

const Actions = () => {
    const dispatch = useListDispatch() ?? (() => {});

  return (
    <div className="action-buttons">
        <button onClick={() => dispatch({ type: 'moveAllLeft' })}>{'<<'}</button>
        <button onClick={() => dispatch({ type: 'moveSelectedLeft' })}>{'<'}</button>
        <button onClick={() => dispatch({ type: 'moveSelectedRight' })}>{'>'}</button>
        <button onClick={() => dispatch({ type: 'moveAllRight' })}>{'>>'}</button>
    </div>
  )
}

export default Actions