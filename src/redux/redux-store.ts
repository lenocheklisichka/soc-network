import {createStore, combineReducers, applyMiddleware} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import {sidebarReducers} from "./sidebar-reducers";
import authReducer from "./auth-reducer";
import thunk from "redux-thunk";
import appReducer from "./app-reducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducers,
    auth: authReducer,
    app: appReducer,
})

let store = createStore(rootReducer, applyMiddleware(thunk));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStoreType = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppRootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store= store

export default store;