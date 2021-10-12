import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {AppDispatch, AppRootState} from "../../redux/redux-store";
import { setUserProfileAC} from "../../redux/profile-reducer";
import {ProfileType} from "../../redux/types";
import Profile from "./Profile";

type PropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`, {headers: {'API-KEY': 'd41ea747-ce32-41f3-af2e-99d81acb40a6'}})
            .then((response: any) => {
            this.props.setUserProfile(response.data)

        });
    }
    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}

export type MapStatePropsType = {
    profile: ProfileType | null;
}

let mapStateToProps = (state: AppRootState): MapStatePropsType => ({
    profile: state.profilePage.profile
})

export type MapDispatchPropsType = {
    setUserProfile: (profile: ProfileType) => void
}

let mapDispatchToProps = (dispatch: AppDispatch): MapDispatchPropsType => {
    return {
        setUserProfile: (profile: ProfileType) => {
            dispatch(setUserProfileAC(profile))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps ) (ProfileContainer);
