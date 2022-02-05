import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPageType} from "../../types/types";
import AddMessageForm from "./AddMessageForm";

export type DialogsPropsType = {
    dialogsPage: DialogsPageType
}

const Dialogs = (props: DialogsPropsType) => {
    let dialogsElements = props.dialogsPage.dialogs.map(d =>
        <DialogItem key={d.id} name={d.name} id={d.id} avatar={d.avatar}/>)

    let messagesElements = props.dialogsPage.messages.map(m =>
        <Message key={m.id} id={m.id} message={m.message}/>)

    return (
        <div>
            <div className={classes.dialogs}>
                <div className={classes.namesItem}>{dialogsElements}</div>
                <div>
                    <div className={classes.messageBox}>{messagesElements}</div>
                </div>
            </div>
            <div className={classes.newMessage}>
                <AddMessageForm/>
            </div>
        </div>
    );
}

export default Dialogs;
