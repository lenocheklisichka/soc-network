import {ActionsTypes} from "../types/types";
import {AppDispatch} from "./redux-store";
import {authAPI, ResultCodesEnum} from "../api/api";

const SET_USER_DATA = "SET-USER-DATA";

const defaultState = {
    userID: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
}

export type InitialStateType = typeof defaultState

const authReducer = (state: InitialStateType = defaultState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA :
            return {
                ...state, ...action.data
            }
        default:
            return state;
    }
}

export type SetAuthUserDataActionDataType = {
    userID: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    data: SetAuthUserDataActionDataType
}
export const setAuthUserData = (userID: number | null, login: string | null, email: string | null, isAuth: boolean)
    : SetAuthUserDataActionType => ({type: SET_USER_DATA, data: {userID, login, email, isAuth}} as const)

export const getAuthUserData = () => (dispatch: AppDispatch) => {
    authAPI.me().then((response: any) => {
        if (response.data.resultCode === ResultCodesEnum.Success) {
            let {id, login, email} = response.data.data
            dispatch(setAuthUserData(id, login, email, true))
        }
    })
}

export const loginTC = (email:string,password:string,rememberMe:boolean) => (dispatch: any) => {
    authAPI.login(email,password,rememberMe).then((response: any) => {
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData())
        }
    })
}

export const logoutTC = () => (dispatch: AppDispatch) => {
    authAPI.logout()
        .then((response: any) => {
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    })
}
export default authReducer