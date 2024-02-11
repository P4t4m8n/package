import { userService } from "../../services/server/user.service"

export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const EDIT_USER = 'EDIT_USER'


const initialState = {
    user: userService.getLoggedinUser(),
    users: [],

}
export function userReducer(state = initialState, action) {
    let idx, users

    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }

        case EDIT_USER:
            return { ...state, user: action.updatedUser }

        case REMOVE_USER:
            idx = state.users.findIndex(user => user._id == action.userId)
            users = state.users.toSpliced(idx, 1)
            return { ...state, users }

        case SET_USERS:
            return { ...state, users: action.users }

        default:
            return state
    }
}
