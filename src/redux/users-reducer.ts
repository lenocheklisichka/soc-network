import {ActionsTypes, UserType} from "./types";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";

const defaultState: InitialStateType = {
    users: []
}

export type InitialStateType = {
    users: Array<UserType>
}

const usersReducer = (state: InitialStateType = defaultState, action: ActionsTypes) : InitialStateType=> {
    switch (action.type) {
        case FOLLOW :
            console.log("switch" + state.users)
            console.log(state.users.length)
            return {
                ...state,
                users: state.users.map(u => {
                    // return u.id === action.userID ? {...u, followed: true} : u;
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            console.log("UNFOLLOW")
            console.log(state.users.length)
            return {
                ...state,
                users: state.users.map(u => {
                    // return u.id === action.userID ? {...u, followed: false} : u
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;

                })
            }
        case SET_USERS:
            console.log("SET-USERS AFTER")
            console.log(state.users.length)
            return {
                ...state, users: action.users
            }
        default:
            console.log("SET-USERS BEFORE")
            console.log(state.users.length)
            return state;
    }
}

export const followAC = (userID: string) => {
    return {
        type: FOLLOW,
        userID,
    } as const
}

export const unfollowAC = (userID: string) => {
    return {
        type: UNFOLLOW,
        userID,
    } as const
}

export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: SET_USERS,
        users,
    } as const
}

export default usersReducer;