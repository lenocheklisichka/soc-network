import {ActionsTypes} from "./types";

const SET_USER_DATA = "SET-USER-DATA";

export type InitialStateType = {
    userID:  number | null
    login:  string | null
    email: string | null
    isAuth: boolean
}

const defaultState: InitialStateType = {
    userID: null,
    login: null,
    email: null,
    isAuth: false,
}

const authReducer = (state: InitialStateType = defaultState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA :
            return {
                ...state, ...action.data, isAuth: true,
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userID: null | number, login: null | string, email: null | string) => (
    {type: SET_USER_DATA, data: {userID, login, email} } as const
)
export default authReducer;