import React from "react";
import {NavLink} from "react-router-dom";
import classes from "./Navbar.module.css";
import {InitialStateSidebarType} from "../../redux/sidebar-reducers";
import woman from "../Navbar/images-icons/woman-avatar.png";

type SidebarPropsType = {
    sidebar: InitialStateSidebarType
}


export const Navbar = (props: SidebarPropsType) => {

    const friendElements = props.sidebar.friends.map(f =>
       <div className={classes.friend} key={f.id}><img src={woman} alt=''/>{f.name}</div>
    )

    return (
        <div className={classes.nav}>
            <div className={classes.item}>
                <NavLink to={"/profile"} activeClassName={classes.activeLink}>Profile</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to={"/dialogs"} activeClassName={classes.activeLink}>Messages</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to={"/news"} activeClassName={classes.activeLink}>News</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to={"/users"} activeClassName={classes.activeLink}>Users</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to={"/musics"} activeClassName={classes.activeLink}>Music</NavLink>
            </div>
            <div className={classes.itemSettings}>
                <NavLink to={"/settings"} activeClassName={classes.activeLink}>Settings</NavLink>
            </div>

            <div className={classes.titleFriends}>Friends online:</div>
            <div className={classes.friends}>
                {friendElements}
            </div>
        </div>
    );
}

export default Navbar;