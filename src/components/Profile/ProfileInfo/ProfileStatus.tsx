import {ProfileType} from "../../../types/types";
import classes from "./ProfileInfo.module.css";
import React, {ChangeEvent} from "react";
import avaWomen from "./../../../assets/images/photo-ava.jpg"
import women from "./../../../assets/images/women.jpg"
import {updateStatus} from "../../../redux/profile-reducer";

export type ProfileStatusPropsType = {
    profile: ProfileType | null
    status: string
    fullName: string
    aboutMe: string
    contacts: {
        vk: string
        instagram: string
        github: string
    }
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deActivateEditMode = () => {
        this.setState({
            editMode: false
        })
        updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: ProfileStatusPropsType, prevState: {}) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                <div className={classes.profileName}>{this.props.fullName || avaWomen || women}</div>
                <div><span>About Me:</span> {this.props.aboutMe || "Student in it-incubator"}</div>
                <div className={classes.contact}><span>My contact:</span></div>
                <div className={classes.contacts}><span>vk:</span> {this.props.contacts.vk || "https://vk.com"}</div>
                <div className={classes.contacts}>
                    <span>instagram:</span> {this.props.contacts.instagram || "https://instagram.com"}</div>
                <div className={classes.contacts}>
                    <span>github:</span> {this.props.contacts.github || "https://github.com"}</div>
                <div className={classes.status}>
                    {!this.state.editMode &&
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || "Hi"}</span>}

                    {this.state.editMode &&
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActivateEditMode}
                           value={this.state.status}/>}
                </div>
            </div>
        );
    }
}
