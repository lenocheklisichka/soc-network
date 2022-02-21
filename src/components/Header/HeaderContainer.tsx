import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppRootState} from "../../redux/redux-store";
import {logoutTC} from "../../redux/auth-reducer";

export type HeaderPropsType = {
    isAuth: boolean
    login: string
    logoutTC: () => void
}

class HeaderContainer extends React.Component<HeaderPropsType> {
    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

type MapStatePropsType = {
    isAuth: boolean
    login: string
}

const mapStateToProps = (state: AppRootState) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    } as MapStatePropsType
}

export default connect(mapStateToProps, {logoutTC})(HeaderContainer)
