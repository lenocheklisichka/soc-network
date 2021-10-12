import {UsersPropsType} from "./UsersContainer";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/women.jpg";
import React from "react";
import { NavLink } from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";

let Users = (props: UsersPropsType) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div className={classes.pagesNumber}>
                {pages.map(p => {
                    return <span className={props.currentPage === p ? classes.selectedPage : ""}
                                 onClick={(e) => {
                                     props.onPageChanged(p)
                                 }}>{p}</span>

                })}
            </div>
            <div className={classes.boxUser}>
                {
                    props.users.map(u => <div key={u.id} className={classes.boxUsers}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                {props.isFetching ? <Preloader/> : null}
                                 <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt={""}
                                      className={classes.avatar}/>
                            </NavLink>
                        </div>
                        <div>
                            {
                                u.followed ?
                                    <button onClick={() => {
                                        props.follow(u.id)
                                    }} className={classes.btn2}>Unfollow</button> :
                                    <button onClick={() => {
                                        props.unfollow(u.id)
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

export default Users;