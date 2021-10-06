
import {AppDispatch, AppRootState} from "../../redux/redux-store";
import {
    followAC,
    InitialStateType,
    setCurrentPageAC,
    setUsersAC,
    unfollowAC
} from "../../redux/users-reducer";
import {UserType} from "../../redux/types";
import {connect} from "react-redux";
import Users from "./Users";

type MapStatePropsType = {
    usersPage: InitialStateType;
    totalUsersCount: number;
    pageSize: number;
    currentPage: number
}

type MapDispatchPropsType = {
    follow: (userID: string) => void
    unfollow: (userID: string) => void
    setUsers: (users: Array<UserType>) => void
    serCurrentPage: (pageNumber: number) => void
    // setTotalUsersCount: (totalCount: number) => void
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType;

let mapStateToProps = (state: AppRootState): MapStatePropsType => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
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
        },
        serCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        // setTotalUsersCount: (totalCount: number) => {
        //     dispatch(setTotalUsersCountAC(totalCount))
        // }
    }
}

export const UsersContainer = connect (mapStateToProps, mapDispatchToProps) (Users)
