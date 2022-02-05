import {sendMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {DialogsPageType} from "../../types/types";
import {AppDispatch, AppRootState} from "../../redux/redux-store";
import {connect} from "react-redux";
import {ComponentType} from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type MapStateToPropsType = {
    dialogsPage: DialogsPageType
}

type MapDispatchToPropsType = {
    onSendMessage: (newMessageBody: string) => void
}

let mapStateToProps = (state: AppRootState): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch: AppDispatch): MapDispatchToPropsType => {
    return {
        onSendMessage: (newMessageBody: string) => {
            dispatch(sendMessageActionCreator(newMessageBody))
        }
    }
}

export const DialogsContainer = withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogs))

export default compose<ComponentType>(
    connect(mapStateToProps, mapDispatchToProps), withAuthRedirect,)(Dialogs)
