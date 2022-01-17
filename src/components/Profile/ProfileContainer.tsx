import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {AppRootState} from "../../redux/redux-store";
import {ProfileType} from "../../redux/types";
import Profile from "./Profile";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router-dom";
import {getStatus, getUsersProfile, updateStatus} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component<ComponentPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "18936"
        }
        this.props.getUsersProfile(userId)
        this.props.getStatus(userId)
    }
    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                         updateStatus={this.props.updateStatus}/>
            </div>
        )
    }
}

export type PathParamsType = {
    userId: string
}

export type ComponentPropsType = RouteComponentProps<PathParamsType> & MapStatePropsType

export type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    getUsersProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status:string) => void
}

let mapStateToProps = (state: AppRootState): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
}) as MapStatePropsType

// export const withAuthRedirect (withRouter (connect(mapStateToProps, {getUsersProfile} )(ProfileContainer)));

export default compose<ComponentType>(
    connect(mapStateToProps, {getUsersProfile, getStatus, updateStatus}),
    withRouter,
    withAuthRedirect,
)(ProfileContainer)
