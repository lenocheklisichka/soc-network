import React from "react";
import UsersPropsType from "./Users";
import classes from "./Users.module.css";
import {UserType} from "../../types/types"
import {User} from "./User"
import {Paginator} from "./Paginator";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    isFetching: boolean
    followingInProgress: Array<string>
    follow: (userID: string) => void
    unfollow: (userID: string) => void
}

let Users = (props: UsersPropsType) => {

    return (
        <div>
            <div className={classes.pagesNumber}>
                <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}
                           currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                />
            </div>
            <User users={props.users} isFetching={props.isFetching}
                  followingInProgress={props.followingInProgress}
                  follow={props.follow} unfollow={props.unfollow}
            />
        </div>
    )
}

export default Users;