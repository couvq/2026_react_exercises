import { useList, useListDispatch, type ListState } from "./TransferListContext";

const Actions = () => {
  const state = useList() ?? {} as ListState;
  const dispatch = useListDispatch() ?? (() => { });

  const isMoveAllLeftButtonEnabled = state.right.length > 0;
  const isMoveAllRightButtonEnabled = state.left.length > 0;
  const isMoveSelectedLeftButtonEnabled = state.right.some(item => item.isSelected);
  const isMoveSelectedRightButtonEnabled = state.left.some(item => item.isSelected);

  return (
    <div className="action-buttons">
      <button disabled={!isMoveAllLeftButtonEnabled} onClick={() => dispatch({ type: 'moveAllLeft' })}>{'<<'}</button>
      <button disabled={!isMoveSelectedLeftButtonEnabled} onClick={() => dispatch({ type: 'moveSelectedLeft' })}>{'<'}</button>
      <button disabled={!isMoveSelectedRightButtonEnabled} onClick={() => dispatch({ type: 'moveSelectedRight' })}>{'>'}</button>
      <button disabled={!isMoveAllRightButtonEnabled} onClick={() => dispatch({ type: 'moveAllRight' })}>{'>>'}</button>
    </div>
  )
}

export default Actions