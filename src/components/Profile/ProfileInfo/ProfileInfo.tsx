import React from "react";
import classes from "./ProfileInfo.module.css";
import {ProfileType} from "../../../types/types";
import Preloader from "../../common/Preloader/Preloader";
import avaWoman from "./../../../assets/images/photo-ava.jpg"
import {ProfileStatus} from "./ProfileStatus";

export type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
}

export type PhotosType = {
    small: string
    large: string
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={classes.sochi}>
            </div>
            <div className={classes.profile}>
                <img src={props.profile.photos.large || avaWoman} alt=""/>
                <div>
                    <ProfileStatus status={props.status} aboutMe={props.profile.aboutMe}
                                   contacts={props.profile.contacts} fullName={props.profile.fullName}
                                   profile={props.profile} updateStatus={props.profile.updateStatus}/>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;