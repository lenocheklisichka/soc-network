import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppRootState} from "../../redux/redux-store";
import {getAuthUserData} from "../../redux/auth-reducer";

export type HeaderPropsType = {
    isAuth: boolean
    login: string
}

class HeaderContainer extends React.Component<MapStatePropsType> {
    componentDidMount() {
          this.props.getAuthUserData()
    }

    render() {
        return (
            <Header login={this.props.login} isAuth={this.props.isAuth}/>
        );
    }
}

type MapStatePropsType = {
    isAuth: boolean
    login: string
    getAuthUserData: () => void
}

const mapStateToProps = (state: AppRootState): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    } as MapStatePropsType
}

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);
