import classes from "./ProfileInfo.module.css";
import React, {ChangeEvent, useEffect, useState} from "react";
import {updateStatusTC} from "../../../redux/profile-reducer";
import {useDispatch} from "react-redux";

export type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
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
        <div className={classes.status}>
            {!editMode &&
            <div>
                <b>Status:</b><span onClick={activateEditMode}>{props.status}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange} autoFocus={true}
                       onBlur={deActivateEditMode}
                       value={status}/>
            </div>
            }
        </div>
    );
}
export default ProfileStatusHooks;
