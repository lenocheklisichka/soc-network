import React, {ChangeEvent} from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPageType} from "../../redux/types";
import { Redirect } from "react-router-dom";

export type DialogsPropsType = {
    dialogsPage: DialogsPageType
    updateNewMessageBody: (newMessage: string) => void
    onSendMessageClick: () => void
    newMessageBody: string
    isAuth: boolean
}

const Dialogs = (props: DialogsPropsType) => {
    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}
                                                                         avatar={d.avatar}/>);
    let messagesElements = props.dialogsPage.messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>);

    let onSendMessageClick = () => {
        props.onSendMessageClick()
    }
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        console.log("Check function before " + e.target.value)
        props.updateNewMessageBody(e.currentTarget.value)
        console.log("Check function after " + e.target.value)
    }

    if(!props.isAuth) return <Redirect to={"/login"}/>

    return (
        <div>
            <div className={classes.dialogs}>
                <div className={classes.namesItem}>
                    {dialogsElements}
                </div>
                <div>
                    <div className={classes.messageBox}>
                        {messagesElements}
                    </div>
                </div>
            </div>
            <div className={classes.newMessage}>
                <div>
                    <textarea placeholder={"Enter your message..."}
                              className={classes.textarea}
                              value={props.dialogsPage.newMessageBody}
                              onChange={onNewMessageChange}
                    />
                </div>
                <div>
                    <button onClick={onSendMessageClick} className={classes.sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;
