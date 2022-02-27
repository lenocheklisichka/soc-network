import React from "react"
import classes from "./Users.module.css"
import {NavLink} from "react-router-dom"
import Preloader from "./../common/Preloader/Preloader"
import {UserType} from "../../types/types"
import userPhoto from "./../../assets/images/avatar-men.png"
import Button from "@mui/material/Button";

export type UserPropsType = {
    users: Array<UserType>
    isFetching: boolean
    followingInProgress: Array<string>
    follow: (userID: string) => void
    unfollow: (userID: string) => void
}

export const User = (props: UserPropsType) => {
    return (
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
                            {u.followed ? <div className={classes.btn}>
                                    <Button
                                        style={{textTransform: 'lowercase'}}
                                        disabled={props.followingInProgress.some(id => id === u.id)}
                                        onClick={() => {
                                            props.unfollow(u.id)
                                        }}>Unfollow
                                    </Button>
                                </div>
                                : <div className={classes.btn}>
                                    <Button
                                        style={{textTransform: 'lowercase'}}
                                        disabled={props.followingInProgress.some(id => id === u.id)}
                                        onClick={() => {
                                            props.follow(u.id)
                                        }}>Follow
                                    </Button>
                                </div>
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
    )
}