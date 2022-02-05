import {AppRootState} from "../../redux/redux-store";
import {
    follow, getUsersThunk, unfollow,
} from "../../redux/users-reducer";
import {UserType} from "../../types/types";
import {connect} from "react-redux";
import React, {ComponentType} from "react";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Users from "./Users";
import {compose} from "redux";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<string>
}
type MapDispatchPropsType = {
    getUsersThunk: (currentPage: number, pageSize: number) => void
    follow: (userID: string) => void
    unfollow: (userID: string) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersThunk(pageNumber, this.props.pageSize)
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
                />
            }
        </>
    }
}

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

// export default withAuthRedirect( connect(mapStateToProps, {
//     follow, unfollow,
//     setUsers, setCurrentPage,
//     toggleIsFetching, toggleFollowingProgress,
//     getUsersThunk,
//     setTotalUsersCount: setTotalUsersCountAC,
// })(UsersContainer));
export default compose<ComponentType>(
    connect(mapStateToProps, {follow, unfollow, getUsersThunk,}), withAuthRedirect)(UsersContainer)
