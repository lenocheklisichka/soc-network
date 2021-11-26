import {ActionsTypes, UserType} from "./types";
import {usersAPI} from "../api/api";
import {AppDispatch} from "./redux-store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
// const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE-IS-FOLLOWING-PROGRESS";

const defaultState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 100,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}

export type InitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<string>
}

const usersReducer = (state: InitialStateType = defaultState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW :
            console.log("switch" + state.users)
            console.log(state.users.length)
            return {
                ...state,
                users: state.users.map(u => {
                    // return u.id === action.userID ? {...u, followed: true} : u;
                    if (u.id === action.userID) {
                        return {...u, followed: true}
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
                        return {...u, followed: false}
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
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return <InitialStateType>{
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userID] :
                    state.followingInProgress.filter(id => id !== action.userID)
            }
        default:
            console.log(state.users.length)
            return state;
    }
}

export const followSuccess = (userID: string) => {
    return {type: FOLLOW, userID,} as const
}

export const unfollowSuccess = (userID: string) => {
    return {type: UNFOLLOW, userID,} as const
}

export const setUsers = (users: Array<UserType>) => {
    return {type: SET_USERS, users,} as const
}

export const setCurrentPage = (currentPage: number) => {
    return {type: SET_CURRENT_PAGE, currentPage,} as const
}

// export const setTotalUsersCountAC = (totalUsersCount: number) => {
//     return { type: SET_TOTAL_USERS_COUNT,count: totalUsersCount, } as const
// }

export const toggleIsFetching = (isFetching: boolean) => {
    return {type: TOGGLE_IS_FETCHING, isFetching} as const
}
export const toggleFollowingProgress = (isFetching: boolean, userID: string) => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID} as const
}

export const getUsersThunk = (currentPage: number, pageSize: number) => {
    return (dispatch: AppDispatch) => {
        dispatch(toggleIsFetching(true))

        usersAPI.getUsers(currentPage, pageSize).then((data: any) => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            // dispatch(setTotalUsersCount(data.totalCount))
        });
    }
}

export const follow = (userID: string) => {
    return (dispatch: AppDispatch) => {
        dispatch(toggleFollowingProgress(true, userID))
        usersAPI.followUsers(userID)
            .then((res: any) => {
                if (res.data.resultCode === 0) {
                    dispatch(followSuccess(userID))
                }
                dispatch(toggleFollowingProgress(false, userID))

            })
    }
}

export const unfollow = (userID: string) => {
    return (dispatch: AppDispatch) => {
        dispatch(toggleFollowingProgress(true, userID))
        usersAPI.unFollowUsers(userID)
            .then((res: any) => {
                if (res.data.resultCode === 0) {
                    dispatch(unfollowSuccess(userID))
                }
                dispatch(toggleFollowingProgress(false, userID))

            })
    }
}

export default usersReducer;