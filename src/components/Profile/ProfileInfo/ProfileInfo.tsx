import React from "react";
import classes from "./ProfileInfo.module.css";
import {ProfileType} from "../../../redux/types";
import Preloader from "../../common/Preloader/Preloader";
import woman from "./../../../assets/images/women.jpg";
import userMen from "../../../assets/images/avatar.png";

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
                {/*<img src={props.profile.photos.large || woman} alt="photo"/>*/}
                {/*<div className={classes.profileName}>Elena K.</div>*/}
                {/*<div>Date of Birth: 11 september</div>*/}
                {/*<div>City: Sochi</div>*/}
                {/*<div>Age: 36 years</div>*/}
                {/*<div>AboutMe: Student in it-incubator</div>*/}
                {/*<div className={classes.contact}>My contact:</div>*/}
                {/*<div className={classes.contacts}>vk: {props.profile.contacts.vk || "not fill..."}</div>*/}
                {/*<div>Status: Studying</div>*/}

                    <img src={props.profile.photos.large || userMen} alt="photo"/>
                <div>
                    <div className={classes.profileName}>{props.profile.fullName}</div>
                    <div>About Me: {props.profile.aboutMe || "not fill..." }</div>
                    <div className={classes.contact}>My contact: </div>
                    <div className={classes.contacts}>vk: {props.profile.contacts.vk || "not fill..."}</div>
                    <div className={classes.contacts}>instagram: {props.profile.contacts.instagram || "not fill..."}</div>
                    <div className={classes.contacts}>github: {props.profile.contacts.github || "not fill..."}</div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;