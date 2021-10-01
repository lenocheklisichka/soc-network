import React from "react";
import classes from "./Message.module.css";
import {MessageType} from "../../../redux/types";

const Message: React.FC<MessageType> = (props) => {
    return (
        <div className={classes.messages}>
            <div className={classes.message}>{props.message}</div>
        </div>
    )
}
export default Message;