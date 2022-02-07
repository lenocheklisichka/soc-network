import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {AppRootState} from "../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
}
const MapStateToPropsTypeForRedirect = (state: AppRootState): MapStatePropsType => {
    return {isAuth: state.auth.isAuth}
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    const AuthRedirectComponent = (props: MapStatePropsType) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) {
            return <Redirect to={"/login"}/>
        }
        return <Component {...restProps as T}/>
    }
    return connect(MapStateToPropsTypeForRedirect)(AuthRedirectComponent)
}