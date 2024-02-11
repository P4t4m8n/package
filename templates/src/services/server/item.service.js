
import { httpService } from './http.service.js'

const BASE_URL = 'item/'

export const itemService = {
    query,
    get,
    save,
    remove,
    getEmptyitem,
    
}

async function query(filterBy = { txt: '' }) {
    try {
        const items = await httpService.get(BASE_URL, filterBy)
        return items
    } catch (err) { throw err }
}

async function get(itemId) {
    try {
        const item = await httpService.get(BASE_URL + itemId)
        return item
    } catch (err) { throw err }
}

async function remove(itemId) {
    try {
        await httpService.delete(BASE_URL + itemId)

    } catch (err) { throw err }
}
async function save(item) {
    const edit = 'edit/'
    try {
        if (item._id) return httpService.put(BASE_URL + edit + item._id, item)
        return await httpService.post(BASE_URL + edit + item)

    } catch (err) { throw err }
}

function getEmptyitem() {
    return {
        name: '',
        imgUrl: '',
        decription: ''

    }
}





