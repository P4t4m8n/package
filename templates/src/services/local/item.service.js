
import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const ITEM_DB = 'item_db'
_createItems()

export const itemService = {
    query,
    get,
    save,
    remove,
    getEmptyitem,
}
window.cs = itemService

async function query(filterBy = {}) {
    try {
        var items = await storageService.query(ITEM_DB)
        if (filterBy.name) {
            const regex = new RegExp(filterBy.txt, 'i')
            items = items.filter(item => regex.test(item.name) || regex.test(item.description))
        }
        return items
    } catch (err) { throw err }
}

async function get(itemId) {
    try {
        const item = await storageService.get(ITEM_DB, itemId)
        return item
    } catch (err) { throw err }
}

async function remove(itemId) {
    return await storageService.remove(ITEM_DB, itemId)
}

async function save(item) {
    let savedItem
    try {

        if (item._id) {
            savedItem = await storageService.put(ITEM_DB, item)
        } else {
            savedItem = await storageService.post(ITEM_DB, item)
        }
        return savedItem
    } catch (err) { throw err }
}

function getEmptyitem() {
    return {
        name: '',
    }
}

function _createItems() {
    let items = utilService.loadFromStorage(ITEM_DB)
    if (!items || !items.length) {
        items = []
        for (var i = 0; i < 20; i++) {
            let object = {
                _id: utilService.makeId(),
                name: utilService.makeLorem(1),
                imgUrl: `https://robohash.org/?set=set3/${utilService.getRandomIntInclusive(1, 9999999)}`,
                decription: utilService.makeLorem(5)
            }
            items.push(object)

        }
        utilService.saveToStorage(ITEM_DB, items)
        return items
    }
}


