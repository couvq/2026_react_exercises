import { useListDispatch } from "./TransferListContext";
import type { Item } from "./types"

interface ListItemProps {
  item: Item,
};

export const ListItem = ({ item }: ListItemProps) => {
  const dispatch = useListDispatch() ?? (() => {});
  return (
    <div>
      <input type="checkbox" checked={item.isSelected} onChange={() => dispatch({ type: 'toggleSelect', label: item.label })} />
      <span>{item.label}</span>
    </div>
  )
}

interface ListProps {
  items: Item[],
}

export const List = ({ items }: ListProps) => {
  return (
    <div>
      {items.map((item) => (
        <ListItem key={item.label} item={item} />
      ))}
    </div>
  )
}