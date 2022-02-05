import {addPostActionCreator, setStatus, setUserProfileAC} from "../redux/profile-reducer";
import {sendMessageActionCreator} from "../redux/dialogs-reducer";
import {
    followSuccess, setCurrentPage, setUsers, toggleFollowingProgress,
    toggleIsFetching, unfollowSuccess, setTotalUsersCountAC
} from "../redux/users-reducer";
import {setAuthUserData} from "../redux/auth-reducer";

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
    // location: UserLocation
}

// export type UserLocation = {
//     country: string,
//     city: string
// }

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
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

export type ActionsTypes =
    ReturnType<typeof addPostActionCreator>
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
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setTotalUsersCountAC>