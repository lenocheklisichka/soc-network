import React from "react";
import {connect} from "react-redux";
import {AppRootState} from "../../redux/redux-store";
import {ProfileType} from "../../redux/types";
import Profile from "./Profile";
import { withRouter } from "react-router-dom";
import {RouteComponentProps} from "react-router-dom";
import {getUsersProfile} from "../../redux/profile-reducer";

class ProfileContainer extends React.Component<ComponentPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = String(18936)
        }
        this.props.getUsersProfile(userId)
    }
    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}

export type PathParamsType = {
    userId: string
}

export type ComponentPropsType = RouteComponentProps<PathParamsType> & MapStatePropsType

export type MapStatePropsType = {
    profile: ProfileType | null;
    getUsersProfile: (userId: string) => void
}

let mapStateToProps = (state: AppRootState): MapStatePropsType => ({
    profile: state.profilePage.profile
}) as MapStatePropsType

let WithUrlDataComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getUsersProfile} )(WithUrlDataComponent);
