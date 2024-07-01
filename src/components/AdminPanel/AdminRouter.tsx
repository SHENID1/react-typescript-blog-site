import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Page404 from "../Page404/Page404";
import AdminLayout from "../AdminLayout/AdminLayout";
import MainAdmin from "./MainAdmin";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {userSlice} from "../../store/reducers/UserSlice";
import loginArgs from "../../models/loginArgs";
import AuthApi from "../../api/authApi";
import LoginFormComponent from "../AuthPage/LoginFormComponent";
import cl from "./style.module.css"
import AuthService from "../../services/AuthService";
import Page403Component from "../Page403/Page403Component";
import CategoriesDashboardComponent from "../CategoriesDashboardPage/CategoriesDashboardComponent";

const AdminRouter: React.FC = () => {
    const dispatch = useAppDispatch()
    const {isAuth, loading, user,} = useAppSelector(state => state.authReducer)
    const {successLogin, logout} = userSlice.actions;


    const ll = async (args: loginArgs) => {
        return await AuthService.login(args, dispatch, successLogin)
    }

    const handleLogin = (args: loginArgs) => {
        ll(args).then()
    }

    const checkAuth = React.useCallback(() => {
        AuthApi.checkAuth().then((res) => {
            localStorage.setItem("token", res.accessToken);
            dispatch(successLogin(res))
        }).catch(() => {
            AuthService.logout_handler(dispatch, logout).then()
            localStorage.removeItem('remember')
            return <LoginFormComponent onFinish={handleLogin}/>
        })
        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth()
        }
    }, [checkAuth])


    if (localStorage.getItem('remember') !== null) {
        const n: number = Number(localStorage.getItem('remember'))
        localStorage.setItem('remember', (n + 1).toString())
        if (n >= 2) {
            AuthService.logout_handler(dispatch, logout).then()
            localStorage.removeItem('remember')
            return <LoginFormComponent onFinish={handleLogin}/>
        }
    }
    if (loading && localStorage.getItem("token")) {
        return <div className={cl.loadScreen}>
            <h1>Подождите...</h1>
        </div>
    }
    if (!isAuth) return <>
        <LoginFormComponent onFinish={handleLogin}/>
    </>

    if (!user?.roles.includes("ADMIN")) return <Page403Component/>


    return (
        <Routes>
            <Route path="/" element={<AdminLayout/>}>
                <Route index element={<MainAdmin/>}/>
                <Route path={"/categories"} element={<CategoriesDashboardComponent/>}/>
                <Route path={"*"} element={<Page404/>}/>
            </Route>
        </Routes>
    );
};

export default AdminRouter;