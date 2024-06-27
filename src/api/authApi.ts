import loginArgs from "../models/loginArgs";
import $api from "./index";
import IUser from "../models/IUser";

interface LoginResponse {
    message: string;
    user: IUser;
    token: string;
}
export default class AuthApi {
    static async login(arg: loginArgs) {
        try {
            const res = await $api.post<LoginResponse>('auth/login', arg)
            return res.data
        }
        catch (e) {
            return null
        }
    }
}