import React from "react";
import {NavLink} from "react-router-dom";
import classes from "./Header.module.css";
import {HeaderPropsType} from "./HeaderContainer";
import Button from "@mui/material/Button";

function Header(props: HeaderPropsType) {
    return (
        <header className={classes.header}>
            <img src="https://arch-sochi.ru/wp-content/uploads/2020/12/img-arso-6268.jpg" alt="logo"/>
            <div className={classes.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <Button type={'submit'} variant={'contained'}
                                                 color={'primary'} onClick={props.logoutTC}>Logout</Button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header
