import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': 'd41ea747-ce32-41f3-af2e-99d81acb40a6'}
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,)
            .then(response => {return response.data});
    },
    followUsers(id: string) {
        return instance.post(`follow/${id}`)
    },
    unFollowUsers(id: string) {
        return instance.delete(`follow/${id}`)
    },
    getProfile(userId: string) {
        return instance.get(`profile/${userId}`)
    }
}

export const authAPI = {
    me() {return instance.get(`auth/me`)}
}


