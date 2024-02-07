export const SET_ITEMS = 'SET_ITEMS'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const ADD_ITEM = 'ADD_ITEM'
export const EDIT_ITEM = 'EDIT_ITEM'


const initialState = {
    items: [],
}

export function itemReducer(state = initialState, action) {
    let idx, items
    switch (action.type) {
        case SET_ITEMS:
            return { ...state, items: action.items }
        case REMOVE_ITEM:
            idx = state.items.findIndex(item => item._id === action.itemId)
            items = state.items.toSpliced(idx, 1)
            return { ...state, items }

        case ADD_ITEM:
            return { ...state, items: [...state.items, action.savedItem] }

        case EDIT_ITEM:
            idx = state.items.findIndex(item => item._id === action.savedItem._id)
            items = state.items.toSpliced(idx, 1, action.item)
            return { ...state, items }

        default:
            return state
    }
}

