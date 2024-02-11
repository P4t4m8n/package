

export const SET_CONTEXT_MENU = "SET_CONTEXT_MENU"
export const SET_DRAG_OBJ = 'SET_DRAG_OBJ'

const initialSate = {
    contextMenu: null,
    dragObj: { item: {}, from: {} }
}

export function appRedcuer(state = initialSate, action = {}) {

    switch (action.type) {

        case SET_CONTEXT_MENU:
            return { ...state, contextMenu: action.contextMenu }

        case SET_DRAG_OBJ:
            return { ...state, dragObj: action.obj }

        default:
            return state
    }
}