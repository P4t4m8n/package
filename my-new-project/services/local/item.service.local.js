
import { utilService } from '../util.service.js'
import { storageService } from './async-storage.service.js'

const ITEM_DB = 'item_db'
_createItems()

export const itemServiceLocal = {
    query,
    getById,
    save,
    remove,
    getEmptyitem,
}
window.cs = itemServiceLocal

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

async function getById(itemId) {
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
        console.log("saveditem:", savedItem)
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
        items = [
            {
                _id: utilService.makeId(),
                name: 'Hi Patamon',
                imgUrl: 'src/assets/img/1.png',
                decription: 'Hello from Patamon!'
            },
            {
                _id: utilService.makeId(),
                name: 'Weeeeeeee Patamon',
                imgUrl: 'src/assets/img/2.png',
                decription: 'Weeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
            },
            {
                _id: utilService.makeId(),
                name: 'Angry Patamon',
                imgUrl: 'src/assets/img/3.png',
                decription: 'Pffffff!'
            },
            {
                _id: utilService.makeId(),
                name: 'Whut?!',
                imgUrl: 'src/assets/img/4.png',
                decription: 'oh?'
            },
            {
                _id: utilService.makeId(),
                name: 'Happy Patamon',
                imgUrl: 'src/assets/img/5.png',
                decription: ''
            },
            {
                _id: utilService.makeId(),
                name: 'Flying Patamon',
                imgUrl: 'src/assets/img/6.png',
                decription: 'EEEAAAAGGGAALEEEE'
            }
        ]
        utilService.saveToStorage(ITEM_DB, items)
    }
    return items
}



