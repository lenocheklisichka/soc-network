import {UsersPropsType} from "./UsersContainer";
import classes from "./Users.module.css";
import axios from "axios";
import userPhoto from './../../assets/images/women.jpg'
import React from "react";

class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {headers: {'API-KEY': 'd41ea747-ce32-41f3-af2e-99d81acb40a6'}}).then((response: any) => {
            this.props.setUsers(response.data.items)
            // this.props.setTotalUsersCount(response.data.totalCount)
        });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.serCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`, {headers: {'API-KEY': 'd41ea747-ce32-41f3-af2e-99d81acb40a6'}}).then((response: any) => {
            this.props.setUsers(response.data.items)
        });
    }


    render() {
        let pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = []
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i)
        }

        return (
            <div>
                <div className={classes.pagesNumber}>
                    {pages.map(p => {
                        return <span className={this.props.currentPage === p ? classes.selectedPage : ""}
                                     onClick={(e) => {
                                         this.onPageChanged(p)
                                     }}>{p}</span>

                    })}
                </div>
                <div className={classes.boxUser}>
                    <div className={classes.usersTitle}>Users</div>
                    {
                        this.props.usersPage.users.map(u => <div key={u.id} className={classes.boxUsers}>
                    <span>
                        <div>
                            <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt={""}
                                 className={classes.avatar}/>
                        </div>
                        <div>
                            {
                                u.followed ?
                                    <button onClick={() => {
                                        this.props.follow(u.id)
                                    }} className={classes.btn2}>Unfollow</button> :
                                    <button onClick={() => {
                                        this.props.unfollow(u.id)
                                    }} className={classes.btn}>Follow</button>
                            }
                        </div>
                    </span>
                            <div className={classes.blockName}>
                                <div>
                                    <div>{u.name}</div>
                                    <div className={classes.status}>{u.status}</div>
                                </div>
                                <div>
                                    <div>{"u.location.country"}</div>
                                    <div className={classes.city}>{"u.location.city"}</div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
                {/*<button className={classes.button}>Show more</button>*/}
            </div>
        )
    }
}

export default Users;
