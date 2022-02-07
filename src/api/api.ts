import axios, {AxiosResponse} from "axios";
import { UserType } from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': 'd41ea747-ce32-41f3-af2e-99d81acb40a6'}
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

type MeResponseType = {
    data: {
        id: string
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`,)
            .then(response => {return response.data});
    },
    followUsers(id: string) {
        return instance.post(`follow/${id}`)
    },
    unFollowUsers(id: string) {
        return instance.delete(`follow/${id}`)
    },
    getProfile(userId: string) {
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status})
    }
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{userId: number}>>>('auth/login',{email,password,rememberMe})
    },
    logout() {
        return instance.delete('auth/login')
    }
}