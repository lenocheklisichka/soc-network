import {AppRootState} from "../../redux/redux-store";
import {
    follow, getUsersThunk, setCurrentPage, setUsers,
    toggleFollowingProgress, toggleIsFetching, unfollow,
} from "../../redux/users-reducer";
import {UserType} from "../../redux/types";
import {connect} from "react-redux";
import React from "react";
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
    followingInProgress: Array<string>
    toggleFollowingProgress: (isFetching: boolean, userID: string) => void
}

class UsersContainer extends React.Component<any> {

    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersThunk(pageNumber, this.props.pageSize)
        // this.props.setCurrentPage(pageNumber)
        // this.props.toggleIsFetching(true)
        //
        // usersAPI.getUsers(pageNumber, this.props.pageSize)
        //     .then((data: any) => {
        //         this.props.toggleIsFetching(false)
        //         this.props.setUsers(data.items)
        //     });
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
                         isFetching={this.props.isFetching}
                         followingInProgress={this.props.followingInProgress}
                         toggleFollowingProgress={this.props.toggleFollowingProgress}/>
            }
        </>
    }
}

type MapStatePropsType = {
    users: Array<UserType>
    totalUsersCount: number;
    pageSize: number;
    currentPage: number;
    isFetching: boolean;
    followingInProgress: Array<string>
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
        followingInProgress: state.usersPage.followingInProgress,
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
    follow, unfollow,
    setUsers, setCurrentPage,
    toggleIsFetching, toggleFollowingProgress,
    getUsersThunk,
    //setTotalUsersCount: setTotalUsersCountAC,
})(UsersContainer);
