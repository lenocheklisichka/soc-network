import {v1} from "uuid";
import {ActionsType, PostType, ProfileType} from "../types/types";
import {AppDispatch} from "./redux-store";
import {profileAPI, ResultCodesEnum, usersAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS = "SET-STATUS";

const initialState = {
    posts: [
        {id: v1(), message: "Hi, my name is Elena! I travel a lot around the world!", likesCount: 75},
        {id: v1(), message: "I'm studying to be a front-end developer!", likesCount: 85},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
}

export type InitialStateType = typeof initialState

const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostType = {
                id: v1(),
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        default:
            return state
    }
}

type AddPostActionCreatorActionType = { type: typeof ADD_POST, newPostText: string }
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType =>
    ({type: ADD_POST, newPostText} as const)

type SetUserProfileActionCreatorActionType = { type: typeof SET_USER_PROFILE, profile: ProfileType }
export const setUserProfileAC = (profile: ProfileType): SetUserProfileActionCreatorActionType =>
    ({type: SET_USER_PROFILE, profile} as const)

type SetStatusActionType = { type: typeof SET_STATUS, status: string }
export const setStatus = (status: string): SetStatusActionType =>
    ({type: SET_STATUS, status} as const)


export const getUsersProfile = (userId: string) => (dispatch: AppDispatch) => {
    usersAPI.getProfile(userId).then((response: any) => {
        dispatch(setUserProfileAC(response.data))
    });
}
export const getStatus = (userId: string) => (dispatch: AppDispatch) => {
    profileAPI.getStatus(userId).then((response: any) => {
        dispatch(setStatus(response.data))
    })
}
export const updateStatus = (status: string) => (dispatch: AppDispatch) => {
    profileAPI.updateStatus(status).then((response: any) => {
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(setStatus(response.data))
        }
    })
}

export default profileReducer


