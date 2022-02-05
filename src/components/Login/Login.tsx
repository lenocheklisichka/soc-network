import React from "react";
import {LoginForm} from "./LoginForm";
import classes from "./Login.module.css";
import {Redirect} from "react-router-dom";

export const Login = () => {
    return (
        <div className={classes.formLogin}>
            <h1 className={classes.headerLogin}>Login</h1>
            <LoginForm/>
        </div>
    )
}