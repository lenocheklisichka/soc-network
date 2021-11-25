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
                {/*<div>City: Sochi</div>*/}
                {/*<div>Status: Studying</div>*/}

                    <img src={props.profile.photos.large || woman} alt="photo"/>
                <div>
                    <div className={classes.profileName}>{props.profile.fullName}</div>
                    <div><b>About Me:</b> {props.profile.aboutMe ||  "Student in it-incubator" }</div>
                    <div className={classes.contact}>My contact: </div>
                    <div className={classes.contacts}><b>vk:</b> {props.profile.contacts.vk || "https://vk.com/"}</div>
                    <div className={classes.contacts}><b>instagram:</b> {props.profile.contacts.instagram || "https://instagram.com/"}</div>
                    <div className={classes.contacts}><b>github:</b> {props.profile.contacts.github || "https://github.com/"}</div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;