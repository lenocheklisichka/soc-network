import {ActionsType, UserType} from "../types/types";
import {ResultCodesEnum, usersAPI} from "../api/api";
import {AppDispatch} from "./redux-store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE-IS-FOLLOWING-PROGRESS";

const defaultState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<string>, // array id users
}

type InitialStateType = typeof defaultState

const usersReducer = (state: InitialStateType = defaultState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW :
            return {
                ...state, users: state.users.map(u => {
                    return u.id === action.userID ? {...u, followed: true} : u;
                })
            }
        case UNFOLLOW:
            return {
                ...state, users: state.users.map(u => {
                    return u.id === action.userID ? {...u, followed: false} : u
                })
            }
        case SET_USERS:
            return {...state, users: action.users}
        case  SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case TOGGLE_IS_FETCHING :
            return {...state, isFetching: action.isFetching}
        case  SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {...state,followingInProgress: action.isFetching 
                ? [...state.followingInProgress, action.userID]
                :state.followingInProgress.filter(id => id !== action.userID)}
        default:
            return state
    }
}

type FollowSuccessActionType = {type: typeof FOLLOW, userID: string}
export const followSuccess = (userID: string):FollowSuccessActionType => 
 ({type: FOLLOW, userID} as const)

type UnfollowSuccessActionType = {type: typeof UNFOLLOW, userID: string}
export const unfollowSuccess = (userID: string):UnfollowSuccessActionType => 
 ({type: UNFOLLOW, userID} as const)

type SetUsersActionType = {type: typeof SET_USERS, users: Array<UserType>}
export const setUsers = (users: Array<UserType>):SetUsersActionType =>
 ({type: SET_USERS, users} as const)

type SetCurrentPageActionType = {type: typeof SET_CURRENT_PAGE, currentPage: number}
export const setCurrentPage = (currentPage: number):SetCurrentPageActionType => 
 ({type: SET_CURRENT_PAGE, currentPage} as const)

type SetTotalUsersCountActionType = {type: typeof SET_TOTAL_USERS_COUNT, totalUsersCount: number}
export const setTotalUsersCountAC = (totalUsersCount: number):SetTotalUsersCountActionType => 
 ({type: SET_TOTAL_USERS_COUNT, totalUsersCount} as const)

type ToggleIsFetchingActionType = {type: typeof TOGGLE_IS_FETCHING, isFetching: boolean}
export const toggleIsFetching = (isFetching: boolean):ToggleIsFetchingActionType => 
 ({type: TOGGLE_IS_FETCHING, isFetching} as const)

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,isFetching: boolean, userID: string
 }
export const toggleFollowingProgress = (isFetching: boolean, userID: string)
:ToggleFollowingProgressActionType => 
({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID} as const)

export const getUsersThunk = (currentPage: number, pageSize: number) => {
    return (dispatch: AppDispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))

        usersAPI.getUsers(currentPage, pageSize)
        .then((data) => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCountAC(data.totalCount))
        });
    }
}


export const follow = (userID: string) => {
    return (dispatch: AppDispatch) => {
        dispatch(toggleFollowingProgress(true, userID))
        usersAPI.followUsers(userID)
            .then((res: any) => {
                if (res.data.resultCode === ResultCodesEnum.Success) {
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
                if (res.data.resultCode === ResultCodesEnum.Success) {
                    dispatch(unfollowSuccess(userID))
                }
                dispatch(toggleFollowingProgress(false, userID))
            })
    }
}

export default usersReducer