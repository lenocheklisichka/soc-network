import {ActionsType, DialogType, MessageType} from "../types/types";
import {v1} from "uuid";

const SEND_MESSAGE = "SEND-MESSAGE";

const initialState = {
    dialogs: [
        {
            id: v1(),
            name: "Elena",
            avatar: 'https://klike.net/uploads/posts/2019-07/1564314090_3.jpg'
        },
        {
            id: v1(),
            name: "Petr",
            avatar: 'https://storage.theoryandpractice.ru/tnp/uploads/image_unit/000/156/586/image/base_87716f252d.jpg'
        },
        {
            id: v1(),
            name: "Anna",
            avatar: "https://cs8.pikabu.ru/post_img/big/2017/11/21/8/151127099913557940.jpg"
        },
        {
            id: v1(),
            name: "Ludmila",
            avatar: "https://cs8.pikabu.ru/post_img/big/2017/11/21/8/151127099913557940.jpg"
        },
        {
            id: v1(),
            name: "Aleksey",
            avatar: 'https://bipbap.ru/wp-content/uploads/2017/12/65620375-6b2b57fa5c7189ba4e3841d592bd5fc1-800-640x426.jpg'
        },
    ] as Array<DialogType>,

    messages: [
        {id: v1(), message: "Hey, favorite! How are you?"},
        {id: v1(), message: "Hey my dear! I'm great!I work remotely.How are you?"},
        {id: v1(), message: "Hey, Anna! How are you doing in school?"},
        {id: v1(), message: "Hey! I am fine! There are only fives at school"},
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, {id: v1(), message: action.newMessageBody}],
            }
        }
        default:
            return state
    }
}

type SendMessageActionCreatorActionType = { type: typeof SEND_MESSAGE, newMessageBody: string }
export const sendMessageActionCreator = (newMessageBody: string): SendMessageActionCreatorActionType =>
    ({type: "SEND-MESSAGE", newMessageBody} as const)

export default dialogsReducer