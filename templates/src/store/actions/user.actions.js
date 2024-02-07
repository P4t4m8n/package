// import { userService } from '../../services/server/user.service.js'
import { userServiceLocal } from '../../services/local/user.service.local.js'
import { EDIT_USER,REMOVE_USER, SET_USER, SET_USERS } from '../reducers/user.reducer.js'
// import { socketService } from '../../services/server/socket.service.js'
import { store } from '../store.js'

export async function loadUsers() {
    try {
        const users = await userServiceLocal.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
        throw err
    }
}

export async function removeUser(userId) {
    try {
        await userServiceLocal.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
        throw err
    }
}

export async function updateUser(user) {
    try {
        const savedUser = await userServiceLocal.update(user)
        store.dispatch({ type: EDIT_USER, savedUser })
        return savedUser
    } catch (err) {
        console.log('UserActions: Cannot update user', err)
        throw err
    }
}

export async function login(credentials) {
    try {
        const user = await userServiceLocal.login(credentials)
        store.dispatch({ type: SET_USER, user })
        // socketService.login(user)
        return user
    } catch (err) {
        console.log('UserActions: Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userServiceLocal.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        // socketService.login(user)
        return user
    } catch (err) {
        console.log('UserActions: Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userServiceLocal.logout()
        store.dispatch({ type: SET_USER, user: null })
        // socketService.logout()
    } catch (err) {
        console.log('UserActions: Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userServiceLocal.getById(userId)
        return user
    } catch (err) {
        console.log('UserActions: Cannot load user', err)
    }
}