import Actions from "./Actions"
import { List } from "./List"
import "./transfer_list.css"
import { ListProvider, useList } from "./TransferListContext"

const ListContainer = () => {
    const state = useList();

    return (
        <div className="transfer-list">
            <List items={state.left} />
            <Actions />
            <List items={state.right} />
        </div>
    )
}

const TransferList = () => {
    return (
        <ListProvider>
            <ListContainer />
        </ListProvider>
    )
}

export default TransferList