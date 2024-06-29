import React from 'react';
import {Route, Routes} from "react-router-dom";
import Page404 from "../Page404/Page404";
import AdminLayout from "../AdminLayout/AdminLayout";
import MainAdmin from "./MainAdmin";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {userSlice} from "../../store/reducers/UserSlice";
import loginArgs from "../../models/loginArgs";
import AuthApi from "../../api/authApi";
import {message} from "antd";
import LoginFormComponent from "../AuthPage/LoginFormComponent";

const AdminRouter: React.FC = () => {
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
         <Routes>
            <Route path="/" element={<AdminLayout/>}>
                <Route index element={<MainAdmin/>}/>
                <Route path={"*"} element={<Page404/>}/>
            </Route>
        </Routes>
    );
};

export default AdminRouter;