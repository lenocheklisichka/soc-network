import {v1} from "uuid";

type FriendsType = {
    id: string;
    name: string;
}
export type initialStateSidebarType = {
    friends: Array<FriendsType>
}

let initialState: initialStateSidebarType= {
    friends: [
        {id: v1(), name: "Anna"},
        {id: v1(), name: "Julia"},
        {id: v1(), name: "Maria"},
        {id: v1(), name: "Ludmila"},
        {id: v1(), name: "Ksenia"},
    ]
}
export const sidebarReducers = (state: initialStateSidebarType = initialState) => {
    return state
}
