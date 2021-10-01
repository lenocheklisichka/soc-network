import {UsersPropsType} from "./UsersContainer";
import {useEffect} from "react";
import classes from "./Users.module.css";
import axios from "axios";
import userPhoto from './../../assets/images/women.jpg'

const Users = (props: UsersPropsType) => {

   useEffect(()=>{
       if (props.usersPage.users.length === 0) {
           axios.get("https://social-network.samuraijs.com/api/1.0/users", { headers: {'API-KEY': 'd41ea747-ce32-41f3-af2e-99d81acb40a6'} }).then((response:any) => {
               props.setUsers(response.data.items)
           });
       }
   }, [])


    return (
        <div>
            <div className={classes.usersTitle}>Users</div>
            <div className={classes.boxUser}>
                {
                    props.usersPage.users.map(u => <div key={u.id} className={classes.boxUsers}>
                    <span>
                        <div>
                            <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt={""}
                                 className={classes.avatar}/>
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
            <button className={classes.button}>Show more</button>
        </div>
    )
}

export default Users;
