import {v1} from "uuid";
import {ActionsTypes, PostType} from "./types";
import {AppDispatch} from "./redux-store";
import {usersAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const CHANGE_NEW_POST_TEXT = "CHANGE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE";

type setUsersProfileAT = {
    type: 'SET-USER-PROFILE'
    profile: any
}

const initialState = {
    newPostText: "",
    posts: [
        {id: v1(), message: "Hi, my name is Elena! This is my first post!", likesCount: 65},
        {id: v1(), message: "I travel a lot around the world!", likesCount: 70},
        {id: v1(), message: "I'm studying to be a front-end developer! A very demanded profession!", likesCount: 50},
    ],
    profile: null,
}

export type InitialStateType = typeof initialState

const profileReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    console.log("Update " + action.type)
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostType = {
                id: v1(),
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            }
        }
        case CHANGE_NEW_POST_TEXT: {
            return <InitialStateType>{...state, newPostText: action.newText}
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        default:
            return state;
    }
}

export const addPostActionCreator = () => {
    return {type: ADD_POST,} as const
}

export const changeNewTextActionCreator = (newText: string | undefined) => {
    return {type: CHANGE_NEW_POST_TEXT, newText,} as const
}

export const setUserProfileAC = (profile: any): setUsersProfileAT => {
    return {type: SET_USER_PROFILE, profile,}
}

export const getUsersProfile = (userId: string) => (dispatch: AppDispatch) => {
    usersAPI.getProfile(userId).then((response: any) => {
        dispatch(setUserProfileAC(response.data))
    });
}

export default profileReducer;


