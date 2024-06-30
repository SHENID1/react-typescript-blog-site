import React from 'react';
import cl from "./style.module.css";
import {userSlice} from "../../store/reducers/UserSlice";
import AuthService from "../../services/AuthService";
import {useAppDispatch} from "../../hooks/redux";
import {Button, ConfigProvider} from "antd";

const Page403Component = () => {
    document.title = "403 Error";
    const {logout} = userSlice.actions;
    const dispatch = useAppDispatch()

    const logout_handler = () => {
        AuthService.logout_handler(dispatch, logout).then()
    }
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        defaultHoverBorderColor: "rgb(23,246,195)",
                        defaultHoverColor: "rgb(0,45,38)",
                    },
                },
            }}
        >
            <div className={cl.cont}>
                <h1>У вас нет доступа к этой странице</h1>
                <Button onClick={logout_handler} className={cl.btn}>Выйти</Button>
            </div>
        </ConfigProvider>
    );
};

export default Page403Component;