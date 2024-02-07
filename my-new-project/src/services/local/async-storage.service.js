import { utilService } from "../util.service"

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType, delay = 1) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

async function get(entityType, entityId) {
    try {
        const entities = await query(entityType)
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    } catch (err) { throw err }

}

async function post(entityType, newEntity) {
    newEntity = JSON.parse(JSON.stringify(newEntity))
    newEntity._id = utilService.makeId()
    try {
        const entities = await storageService.query(entityType)
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    } catch (err) { throw err }

}

async function put(entityType, updatedEntity) {
    updatedEntity = JSON.parse(JSON.stringify(updatedEntity))
    try {
        const entities = await query(entityType)
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    } catch (err) { throw err }
}

async function remove(entityType, entityId) {
    try {
        const entities = await query(entityType)
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    } catch (err) { throw err }
}

function _save(entityType, entities) {
    console.log("entityType:", entityType)
    console.log("entities:", ...entities)
    localStorage.setItem(entityType, JSON.stringify(entities))
}
