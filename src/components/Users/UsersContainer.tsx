import { AppRootState} from "../../redux/redux-store";
import {
    followAC,
    setCurrentPageAC,
    setUsersAC, toggleIsFetchingAC,
    unfollowAC
} from "../../redux/users-reducer";
import {UserType} from "../../redux/types";
import {connect} from "react-redux";
import React from "react";
import axios from "axios";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

export type UsersPropsType = {
    users: Array<UserType>
    isFetching: boolean
    follow: (userID: string) => void
    unfollow: (userID: string) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

class UsersContainer extends React.Component<any> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {headers: {'API-KEY': 'd41ea747-ce32-41f3-af2e-99d81acb40a6'}}).then((response: any) => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.data.items)
            // this.props.setTotalUsersCount(response.data.totalCount)
        });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`, {headers: {'API-KEY': 'd41ea747-ce32-41f3-af2e-99d81acb40a6'}}).then((response: any) => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.data.items)
        });
    }


    render() {
        return <>
            {this.props.isFetching
                ? <Preloader/>
                : <Users users={this.props.users}
                         totalUsersCount={this.props.totalUsersCount}
                         pageSize={this.props.pageSize}
                         currentPage={this.props.currentPage}
                         follow={this.props.follow}
                         unfollow={this.props.unfollow}
                         onPageChanged={this.onPageChanged}
                         isFetching={this.props.isFetching}/>
            }
        </>
    }
}

type MapStatePropsType = {
    users: Array<UserType>
    totalUsersCount: number;
    pageSize: number;
    currentPage: number;
    isFetching: boolean
}

// type MapDispatchPropsType = {
//     follow: (userID: string) => void
//     unfollow: (userID: string) => void
//     setUsers: (users: Array<UserType>) => void
//     setCurrentPage: (pageNumber: number) => void
//     toggleIsFetching: (isFetching: boolean) => void
//     // setTotalUsersCount: (totalCount: number) => void
// }

// export type UsersPropsType = MapStatePropsType & MapDispatchPropsType;

let mapStateToProps = (state: AppRootState): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}

// let mapDispatchToProps = (dispatch: AppDispatch): MapDispatchPropsType => {
//     return {
//         follow: (userID: string) => {
//             dispatch(followAC(userID))
//         },
//         unfollow: (userID: string) => {
//             dispatch(unfollowAC(userID))
//         },
//         setUsers: (users: Array<UserType>) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber: number) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         toggleIsFetching: (isFetching: boolean) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         },
//         // setTotalUsersCount: (totalCount: number) => {
//         //     dispatch(setTotalUsersCountAC(totalCount))
//         // }
//     }
// }

export default connect(mapStateToProps, {
    follow: followAC,
    unfollow: unfollowAC,
    setUsers: setUsersAC,
    setCurrentPage: setCurrentPageAC,
    toggleIsFetching: toggleIsFetchingAC,
    //setTotalUsersCount: setTotalUsersCountAC,
 } )(UsersContainer);
