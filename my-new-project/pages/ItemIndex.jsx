import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadItems, removeItem } from "../store/actions/item.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { ItemList } from "../cmps/itemIndex/ItemList"
import { Link } from "react-router-dom"

export function ItemIndex() {

    const items = useSelector(storeState => storeState.itemModule.items)

    useEffect(() => {
        loadItems()
    }, [])

    async function onRemoveItem(itemId) {
        try {
            await removeItem(itemId)
            showSuccessMsg('item removed')
        } catch (err) {
            showErrorMsg('Cannot remove item', err)
        }
    }

    return (
        <section className="item-index flex">
            <Link to={'edit'}>Add Item</Link>
            <ItemList items={items} onRemoveItem={onRemoveItem} />
        </section>

    )
}