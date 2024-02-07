import { SET_CONTEXT_MENU, SET_DRAG_OBJ } from "../reducers/app.redcuer"
import { store } from "../store"

export function setContextMenu(contextMenu) {
    store.dispatch({ type: SET_CONTEXT_MENU, contextMenu })
}

export function setDragObj(obj) {
    store.dispatch({ type: SET_DRAG_OBJ, obj })
}