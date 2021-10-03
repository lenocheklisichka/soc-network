import {v1} from "uuid";
import {ActionsTypes, PostType, ProfilePageType} from "./types";

const ADD_POST = "ADD-POST";
const CHANGE_NEW_POST_TEXT = "CHANGE-NEW-POST-TEXT";

const initialState = {
    newPostText: "",
    posts: [
        {id: v1(), message: "Hi, my name is Elena! This is my first post!", likesCount: 65},
        {id: v1(), message: "I travel a lot around the world!", likesCount: 70},
        {id: v1(), message: "I work as a frontend developer! A very demanded profession!", likesCount: 50},
    ]
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
            return {
                ...state,
                newPostText: action.newText
            }  as ProfilePageType
        }
        default:
            return state;
    }
}

export const addPostActionCreator = () => {
    return {
        type: "ADD-POST"
    } as const
}

export const changeNewTextActionCreator = (newText: string | undefined) => {
    return {
        type: "CHANGE-NEW-POST-TEXT",
        newText,
    } as const
}

export default profileReducer;


