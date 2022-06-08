import {ContactsType} from "../../../types/types";
import classes from "./ProfileInfo.module.css";
import React, {ChangeEvent, useEffect, useState} from "react";
import avaWomen from "./../../../assets/images/photo-ava.jpg"
import women from "./../../../assets/images/women.jpg"
import {updateStatusTC} from "../../../redux/profile-reducer";
import {useDispatch} from "react-redux";

export type ProfileStatusPropsType = {
    status: string
    fullName: string
    aboutMe: string
    contacts: ContactsType
}

const ProfileStatusHooks = (props: ProfileStatusPropsType) => {
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deActivateEditMode = () => {
        setEditMode(false)
        dispatch(updateStatusTC(status))
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            <div className={classes.profileName}>{props.fullName || avaWomen || women}</div>
            <div><span><b>About Me:</b></span> {props.aboutMe || "Frontend Developer"}</div>
            <div className={classes.contact}><span>My contact:</span></div>
            <div className={classes.contacts}><span><b>vk:</b></span> {props.contacts.vk || "https://vk.com"}</div>
            <div className={classes.contacts}>
                <span><b>telegram:</b></span> {props.contacts.telegram || "https://t.me/Lisichka_rizhaya"}</div>
            <div className={classes.contacts}>
                <span><b>github:</b></span> {props.contacts.github || "https://github.com/lenocheklisichka"}</div>
            <div className={classes.status}>
                {!editMode &&
                <span onClick={activateEditMode}>{props.status || "---"}</span>}
                {editMode &&
                <input onChange={onStatusChange} autoFocus={true}
                       onBlur={deActivateEditMode}
                       value={status}/>}
            </div>
        </div>
    );
}
export default ProfileStatusHooks;
