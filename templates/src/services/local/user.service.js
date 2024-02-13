import { storageService } from "./async-storage.service"

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const USER_DB = 'user_db'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update,

}

window.userService = userService

async function getUsers() {
    try {
        const users = await storageService.query(USER_DB)
        return users
    } catch (err) { throw err }
}

async function getById(userId) {
    try {
        const user = await storageService.get(USER_DB, userId)
        return user
    } catch (err) { throw err }
}

async function remove(userId) {
    return await storageService.remove(USER_DB, userId)
}

async function update(credentials) {
    try {
        const user = await storageService.get(USER_DB, credentials._id)
        await storageService.put(USER_DB, user)
        if (getLoggedinUser()._id === user._id) setLoggedinUser(user)
        return user
    } catch (err) { throw err }
}

async function login(credentials) {
    try {
        const users = await storageService.query(USER_DB)
        const user = users.find(user => user.userName === credentials.userName)
        if (user) setLoggedinUser(user)
        return user
    } catch (err) { throw err }
}

async function signup(credentials) {
    try {

        const user = await storageService.post(USER_DB, credentials)
        if (user) setLoggedinUser(user)
        return user
    } catch (err) { throw err }
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function setLoggedinUser(user) {
    return sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}




