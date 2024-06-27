import React from 'react';
import {authAPI} from "../../services/AuthService";
import loginArgs from "../../models/loginArgs";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {userSlice} from "../../store/reducers/UserSlice";
import $api from "../../api";
import AuthApi from "../../api/authApi";


const MainAdmin = () => {
    const argg: loginArgs = {username: "TEST", password: "test"}
    const dispatch = useAppDispatch()
    const {isAuth, user} = useAppSelector(state => state.authReducer)
    const {successLogin} = userSlice.actions;
    async function ll(payload: loginArgs) {
        const res = await AuthApi.login(payload);
        if (res !== null) {
            dispatch(successLogin(res))
        }

    }

    if (!isAuth) return <>
        3456y
        <button onClick={() => ll({username: "TEST", password: "test"})}>1233</button>
    </>
    return (
        <div>
            asdfgh<br/>
            {user?.username}
        </div>
        );
};

export default MainAdmin;