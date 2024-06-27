import React from 'react';
import loginArgs from "../../models/loginArgs";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {userSlice} from "../../store/reducers/UserSlice";
import AuthApi from "../../api/authApi";
import LoginFormComponent from "../AuthPage/LoginFormComponent";
import {message} from "antd";


const MainAdmin = () => {
    const dispatch = useAppDispatch()
    const {isAuth, user} = useAppSelector(state => state.authReducer)
    const {successLogin} = userSlice.actions;

    async function ll(payload: loginArgs) {
        const res = await AuthApi.login(payload);
        if (res !== null) {
            localStorage.setItem("token", res.token)
            dispatch(successLogin(res))
        } else {
            return "Неверный логин или пароль"
        }
    }


    const [messageApi, contextHolder] = message.useMessage();
    const viewError = (error: string) => {
        messageApi.open({
            type: 'error',
            content: error,
        }).then();
    };
    const success = (st: string) => {
        messageApi.open({
            type: 'success',
            content: st,
        });
    };
    const handleLogin = (args: loginArgs) => {
        ll(args).then((callback) => {
            if (callback) viewError(callback);
            else success(`Добро Пожаловать, ${args.username}`);
        })
    }

    if (!isAuth) return <>
        <LoginFormComponent onFinish={handleLogin}/>
        {contextHolder}
    </>


    return (
        <div>
            {contextHolder}
            asdfgh<br/>
            {user?.username}
        </div>
    );
};

export default MainAdmin;