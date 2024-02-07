import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { itemReducer } from "./reducers/item.reducer"
import { userReducer } from "./reducers/user.reducer"
import { appRedcuer } from "./reducers/app.redcuer"

const rootReducer = combineReducers({
    itemModule: itemReducer,
    userModule: userReducer,
    appMoudle: appRedcuer,

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())
window.gStore = store



