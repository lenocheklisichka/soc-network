import {ActionsTypes} from "../types/types";
import {AppDispatch} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";
import {Dispatch} from "react";

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState

const appReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
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

export const initializeAppTC = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccessAC())
        })
}

export default appReducer;