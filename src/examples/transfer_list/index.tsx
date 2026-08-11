import Actions from "./Actions"
import { List } from "./List"
import "./transfer_list.css"

const TransferList = () => {
  return (
    <div className="transfer-list">
      <List items={[{ isSelected: false, label: "Item 1"}, { isSelected: true, label: "Item 2"}]} />
      <Actions />
      <List items={[{ isSelected: false, label: "Item 3"}, { isSelected: true, label: "Item 4"}]} />
    </div>
  )
}

export default TransferList