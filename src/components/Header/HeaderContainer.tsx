import React from "react";
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AppRootState} from "../../redux/redux-store";
import {setAuthUserData} from "../../redux/auth-reducer";


export type HeaderPropsType = {
    isAuth: boolean
    login: string
}

class HeaderContainer extends React.Component<MapStatePropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,
            {
                withCredentials: true,
                headers: {'API-KEY': 'd41ea747-ce32-41f3-af2e-99d81acb40a6'}
            })
            .then((response: any) => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data
                    // @ts-ignore
                    this.props.setAuthUserData(id, login, email)
                }
            });
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
}

const mapStateToProps = (state: AppRootState): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    } as MapStatePropsType
}

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);
