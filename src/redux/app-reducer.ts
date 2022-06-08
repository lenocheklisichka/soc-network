import {ActionsType} from "../types/types";
import {AppRootState} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";
import {ThunkDispatch} from "redux-thunk";

const INITIALIZED_SUCCESS = "app/INITIALIZED-SUCCESS";

let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState

const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const initializedSuccessAC = () => ({type: INITIALIZED_SUCCESS} as const)

export const initializeAppTC = () => (dispatch: ThunkDispatch<AppRootState, unknown, ActionsType>) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccessAC())
        })
}

export default appReducer;