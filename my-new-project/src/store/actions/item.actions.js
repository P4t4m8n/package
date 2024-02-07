import { itemServiceLocal } from "../../services/local/item.service.local"
import { itemService } from "../../services/server/item.service"
import { ADD_ITEM, EDIT_ITEM, REMOVE_ITEM, SET_ITEMS } from "../reducers/item.reducer"
import { store } from "../store"

export async function loadItems() {
    try {
        const items = await itemServiceLocal.query()
        store.dispatch({ type: SET_ITEMS, items })

    } catch (err) {
        console.log('Cannot load items', err)
        throw err
    }

}

export async function removeItem(itemId) {
    try {
        await itemServiceLocal.remove(itemId)
        store.dispatch({ type: REMOVE_ITEM, itemId })
    } catch (err) {
        console.log('Cannot remove item', err)
        throw err
    }
}

export async function saveItem(item) {

    const type = (item._id) ? EDIT_ITEM : ADD_ITEM
    try {
        const savedItem = await itemServiceLocal.save(item)
        store.dispatch({ type, savedItem })
        return savedItem
    } catch (err) {
        console.log('Cannot add item', err)
        throw err
    }
}


