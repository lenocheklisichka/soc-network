import {sendMessageActionCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {DialogsPageType} from "../../redux/types";
import {AppDispatch, AppRootState} from "../../redux/redux-store";
import {connect} from "react-redux";
import React, {ComponentType} from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type MapStateToPropsType = {
    dialogsPage: DialogsPageType;
    newMessageBody: string
}

type MapDispatchToPropsType = {
    onSendMessageClick: () => void;
    updateNewMessageBody: (newMessage: string) => void;
}

let mapStateToProps = (state: AppRootState): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
        newMessageBody: state.dialogsPage.newMessageBody
    }
}

let mapDispatchToProps = (dispatch: AppDispatch): MapDispatchToPropsType => {
    return {
        onSendMessageClick: () => {
            dispatch(sendMessageActionCreator());
        },
        updateNewMessageBody: (newMessage: string) => {
            dispatch(updateNewMessageBodyCreator(newMessage))
        }
    }
}

export const DialogsContainer = withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogs));

export default compose<ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
) (Dialogs);
