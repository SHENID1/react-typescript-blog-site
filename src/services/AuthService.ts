import loginArgs from "../models/loginArgs";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload, ThunkDispatch} from "@reduxjs/toolkit";
import AuthApi from "../api/authApi";
import LoginResponse from "../models/loginResponse";

export default class AuthService {
    static async login(payload: loginArgs, dispatch: ThunkDispatch<any, any, any>, successLogin: ActionCreatorWithPayload<LoginResponse>) {
        const res = await AuthApi.login(payload);
        if (res !== null) {
            if (!payload.remember) {
                localStorage.setItem('remember', String(0));
            }
            if (payload.remember) {
                localStorage.removeItem('remember');
            }
            localStorage.setItem("token", res.accessToken)
            dispatch(successLogin(res))
        } else {
            return "Неверный логин или пароль"
        }
    }
    static async logout_handler(dispatch: ThunkDispatch<any, any, any>, logout: ActionCreatorWithoutPayload) {
        const res = await AuthApi.logout();
        if (res !== null) {
            localStorage.removeItem('token');
            dispatch(logout());
        } else {
            return ""
        }
    }


}