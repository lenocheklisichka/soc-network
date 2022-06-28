import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {AppRootState} from "../../redux/redux-store";
import { ProfileType} from "../../types/types";
import Profile from "./Profile";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router-dom";
import {getStatus, getUsersProfile, updateStatusTC} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component<ComponentPropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.autorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }

        this.props.getUsersProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ComponentPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                />
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
    updateStatus: (status:string) => void
    autorizedUserId: string
    getUsersProfile: (userId: string) => void
    getStatus: (userId: string) => void
}

let mapStateToProps = (state: AppRootState): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorizedUserId: state.auth.userId,
}) as MapStatePropsType

export default compose<ComponentType>(
    connect(mapStateToProps, {getUsersProfile, getStatus, updateStatusTC}),
    withRouter,
    withAuthRedirect,
)(ProfileContainer)
