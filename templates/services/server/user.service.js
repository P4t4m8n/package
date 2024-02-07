
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const AUTH_URL = 'auth/'
const USER_URL = 'user/'

export const userService = {
    query,
    login,
    logout,
    signup,
    getLoggedinUser,
    getById,
    remove,
    update,
    getEmptyCredentials,

}

window.userService = userService

async function query() {
    try {
        const users = await httpService.get(USER_URL)
        return users
    } catch (err) { throw err }
}

async function getById(userId) {
    try {
        const user = await httpService.get(USER_URL + userId)
        return user
    } catch (err) { throw err }
}

async function remove(userId) {
    try {
        await httpService.delete(USER_URL + userId)
    } catch (err) { throw err }
}

async function update(credentials) {
    try {
        const user = await httpService.put(USER_URL + credentials._id, credentials)
        if (getLoggedinUser()._id === user._id) setLoggedinUser(user)
        return user
    } catch (err) { throw err }
}

async function login(credentials) {
    try {
        const user = await httpService.post(AUTH_URL + 'login', credentials)
        if (user) setLoggedinUser(user)
        return user


    } catch (err) { throw err }
}

async function signup(credentials) {
    try {
        const user = await httpService.post(AUTH_URL + 'signup', credentials)
        if (user) setLoggedinUser(user)
        return user
    } catch (err) { throw err }
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post(AUTH_URL + 'logout')
}

function setLoggedinUser(user) {
    return sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyCredentials(fullName = '', email = '', userName = '', imgUrl = '', password = '') {
    return { fullName, email, userName, imgUrl, password }
}




