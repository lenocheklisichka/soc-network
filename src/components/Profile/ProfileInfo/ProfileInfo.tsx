import React from "react";
import classes from "./ProfileInfo.module.css";
import {ProfileType} from "../../../types/types";
import Preloader from "../../common/Preloader/Preloader";
import avaWoman from "./../../../assets/images/photo-beautifulGirl.jpg"
import ProfileStatusHooks from "./ProfileStatusHooks";

export type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
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
                <div>
                    <img src={props.profile.photos.large || avaWoman} alt="photo"/>
                </div>
                <div>
                    <div className={classes.profileName}>{props.profile.fullName}</div>
                    <div>
                        <b>About me: </b>
                        {props.profile.aboutMe || "Frontend Developer"}
                    </div>
                    <div className={classes.contact}><span>My contact:</span></div>
                    <div className={classes.contacts}><span><b>vk: </b></span>
                        {props.profile.contacts.vk || "https://vk.com"}</div>
                    <div className={classes.contacts}>
                        <span><b>telegram: </b></span>
                        {props.profile.contacts.telegram || "https://t.me/Lisichka_rizhaya"}</div>
                    <div className={classes.contacts}>
                        <span><b>github: </b></span>
                        {props.profile.contacts.github || "https://github.com/lenocheklisichka"}</div>
                    <ProfileStatusHooks
                        status={props.status}
                        updateStatus={props.profile.updateStatus}/>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;