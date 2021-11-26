import React from "react";
import classes from "./ProfileInfo.module.css";
import {ProfileType} from "../../../redux/types";
import Preloader from "../../common/Preloader/Preloader";
import woman from "./../../../assets/images/women.jpg";

export type ProfileInfoPropsType = {
    profile: ProfileType | null
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
                    <img src={props.profile.photos.large || woman} alt="photo"/>
                <div>
                    <div className={classes.profileName}>{props.profile.fullName}</div>
                    <div><span>About Me:</span> {props.profile.aboutMe ||  "Student in it-incubator" }</div>
                    <div className={classes.contact}><span>My contact:</span></div>
                    <div className={classes.contacts}><span>vk:</span> {props.profile.contacts.vk || "https://vk.com"}</div>
                    <div className={classes.contacts}><span>instagram:</span> {props.profile.contacts.instagram || "https://instagram.com"}</div>
                    <div className={classes.contacts}><span>github:</span> {props.profile.contacts.github || "https://github.com"}</div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;