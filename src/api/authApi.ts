import loginArgs from "../models/loginArgs";
import $api from "./index";
import IUser from "../models/IUser";

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}
export default class AuthApi {
    static async login(arg: loginArgs) {
        try {
            const res = await $api.post<LoginResponse>('auth/login', arg);
            return res.data;
        }
        catch (e) {
            return null;
        }
    }
    static async logout() {
        return $api.post('/auth/logout/')
    }
    static async checkAuth() {
        try {
            const res = await $api.get<LoginResponse>("/auth/refresh");
            return res.data;
        }
        catch (e: any) {
            throw Error(e.message)
        }
    }
}
