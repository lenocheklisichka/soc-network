import React from "react";
import {LoginForm} from "./LoginForm";
import classes from "./Login.module.css";
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {AppRootState} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";

 const Login = (props: MapStatePropsType) => {
     if(props.isAuth) {
         return <Redirect to={"/profile"}/>
     }
    return (
        <div className={classes.formLogin}>
            <h1 className={classes.headerLogin}>Login</h1>
            <LoginForm/>
        </div>
    )
}

type MapStatePropsType = {
     isAuth: boolean
}

const mapStateToProps = (state:AppRootState): MapStatePropsType => ({isAuth: state.auth.isAuth})
export default connect(mapStateToProps,{loginTC})(Login)