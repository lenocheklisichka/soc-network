import {
    addPostActionCreator,
    deletePostAC,
    setStatusAC,
    setUserProfileAC
} from "../redux/profile-reducer";
import {sendMessageActionCreator} from "../redux/dialogs-reducer";
import {
    followSuccess, setCurrentPage, setUsers, toggleFollowingProgress,
    toggleIsFetching, unfollowSuccess, setTotalUsersCountAC
} from "../redux/users-reducer";
import {setAuthUserData} from "../redux/auth-reducer";
import {initializedSuccessAC} from "../redux/app-reducer";

export type PostType = {
    id: string;
    message: string;
    likesCount: number;
}
export type DialogType = {
    id: string;
    name: string;
    avatar: string;
}
export type MessageType = {
    id: string;
    message: string;
}

export type UsersType = {
    users: Array<UserType>
}

export type UserType = {
    id: string
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type ContactsType = {
    vk: string
    telegram: string
    github: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type  ProfileType = {
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string
    contacts: ContactsType
    photos: PhotosType
    updateStatus: (status: string) => void
}

export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

export type ActionsType =
    | ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof sendMessageActionCreator>
    |
    ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    |
    ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof toggleFollowingProgress>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setTotalUsersCountAC>
    | ReturnType<typeof initializedSuccessAC>
    | ReturnType<typeof deletePostAC>
