import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppRootState} from "../../redux/redux-store";
import {getAuthUserData, logoutTC} from "../../redux/auth-reducer";

export type HeaderPropsType = {
    isAuth: boolean
    login: string
    getAuthUserData: () => void
    logoutTC: () => void
}

class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return (
            <Header login={this.props.login} isAuth={this.props.isAuth}
                    getAuthUserData={this.props.getAuthUserData} logoutTC={this.props.logoutTC}/>
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

export default connect(mapStateToProps, {getAuthUserData, logoutTC})(HeaderContainer)
