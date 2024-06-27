import loginArgs from "../models/loginArgs";
import $api from "./index";
import IUser from "../models/IUser";

interface LoginResponse {
    message: string;
    user: IUser;
    token: string;
}
class AuthApi {
    static async login(arg: loginArgs) {
        $api.post<LoginResponse>('auth/login', arg).then((response) => {
            response.data
        }).catch((error) => {

        })
    }
}