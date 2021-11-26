import {sendMessageActionCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {DialogsPageType} from "../../redux/types";
import {AppDispatch, AppRootState} from "../../redux/redux-store";
import {connect} from "react-redux";

type MapStateToPropsType = {
    dialogsPage: DialogsPageType;
    newMessageBody: string
    isAuth: boolean
}

type MapDispatchToPropsType = {
    onSendMessageClick: () => void;
    updateNewMessageBody: (newMessage: string) => void;
}

let mapStateToProps = (state: AppRootState): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
        newMessageBody: state.dialogsPage.newMessageBody,
        isAuth: state.auth.isAuth
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

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
