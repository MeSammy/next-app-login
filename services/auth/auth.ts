import Axios  from "axios"
import { LoginResponse } from "../../types/auth-types"

export const login = async (data: {username: string; password: string}) => {
    console.log(data)
    await Axios.post<LoginResponse>('/api/auth/login', data)
}

export const serverLogin = async (data: {username: string; password: string}) => {
    const res = await Axios.post<LoginResponse>('https://reqres.in/api/login', data)
    return {token: "fbdb"}
}