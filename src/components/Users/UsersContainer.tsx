import Users from "./Users";
import {AppDispatch, AppRootState} from "../../redux/redux-store";
import {followAC, InitialStateType, setUsersAC, unfollowAC} from "../../redux/users-reducer";
import {UserType} from "../../redux/types";
import {connect} from "react-redux";

type MapStatePropsType = {
    usersPage: InitialStateType;
}

type MapDispatchPropsType = {
    follow: (userID: string) => void
    unfollow: (userID: string) => void
    setUsers: (users: Array<UserType>) => void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType;

let mapStateToProps = (state: AppRootState): MapStatePropsType => {
    return {
        usersPage: state.usersPage
    }
}

let mapDispatchToProps = (dispatch: AppDispatch): MapDispatchPropsType => {
    return {
        follow: (userID: string) => {
            dispatch(followAC(userID))
        },
        unfollow: (userID: string) => {
            dispatch(unfollowAC(userID))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        }
    }
}

export const UsersContainer = connect (mapStateToProps, mapDispatchToProps) (Users)
