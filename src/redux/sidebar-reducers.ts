import {v1} from "uuid";

const initialState = {
    friends: [
        {id: v1(), name: "Anna"},
        {id: v1(), name: "Julia"},
        {id: v1(), name: "Maria"},
        {id: v1(), name: "Ludmila"},
        {id: v1(), name: "Ksenia"},
    ]
}

export type InitialStateSidebarType = typeof initialState

export const sidebarReducers = (state: InitialStateSidebarType = initialState)
   :InitialStateSidebarType => {return state}
