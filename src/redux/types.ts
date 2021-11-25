import {addPostActionCreator, changeNewTextActionCreator, setUserProfileAC} from "./profile-reducer";
import {sendMessageActionCreator, updateNewMessageBodyCreator} from "./dialogs-reducer";
import {
     followSuccess, setCurrentPage,
    setUsers, toggleFollowingProgress,
    toggleIsFetching, unfollowSuccess,
} from "./users-reducer";
import {setAuthUserData} from "./auth-reducer";


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
    id: string,
    photos: {
        small: string,
        large: string
    },
    followed: boolean,
    name: string,
    status: string,
    // location: UserLocation
}

// export type UserLocation = {
//     country: string,
//     city: string
// }

export type ProfilePageType = {
    posts: Array<PostType>;
    newPostText: string;
}

export type  ProfileType = {
    aboutMe: string
    contacts: {
        facebook: string
        website: string | null
        vk: string
        twitter: string
        instagram: string
        youtube: string | null
        github: string
        mainLink: string | null
    }
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: string
    photos: {
        small: string
        large: string
    }
}

export type DialogsPageType = {
    dialogs: Array<DialogType>;
    messages: Array<MessageType>;
    newMessageBody: string;
}
// export type RootStateType = {
//     profilePage: ProfilePageType;
//     dialogsPage: DialogsPageType;
// }
export type ActionsTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof changeNewTextActionCreator>
    | ReturnType<typeof updateNewMessageBodyCreator>
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
    | ReturnType<typeof toggleFollowingProgress>;
// ReturnType<typeof setTotalUsersCountAC>;