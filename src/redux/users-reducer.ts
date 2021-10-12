import {ActionsTypes, UserType} from "./types";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
// const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";

const defaultState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 80,
    currentPage: 1,
    isFetching: false,
}

export type InitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

const usersReducer = (state: InitialStateType = defaultState, action: ActionsTypes) : InitialStateType => {
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
            console.log(state.users.length)
            return {...state, users: action.users}
        case  SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case TOGGLE_IS_FETCHING :
            return {...state, isFetching: action.isFetching}
        // case  SET_TOTAL_USERS_COUNT:
        //     return {...state, totalUsersCount: action.count}
        default:
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

export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage,
    } as const
}

// export const setTotalUsersCountAC = (totalUsersCount: number) => {
//     return {
//         type: SET_TOTAL_USERS_COUNT,
//         count: totalUsersCount,
//     } as const
// }

export const toggleIsFetchingAC = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching,
    } as const
}

export default usersReducer;