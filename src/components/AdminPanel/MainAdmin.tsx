import React from 'react';
import {authAPI} from "../../services/AuthService";
import loginArgs from "../../models/loginArgs";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";


const MainAdmin = () => {
    const argg: loginArgs = {username: "TEST", password: "test"}
    const dispatch = useAppDispatch()
    const {isAuth} = useAppSelector(state => state.authReducer)

    if (!isAuth) return <>3456y</>
        return (
            <div>
                asdfgh
            </div>
        );
};

export default MainAdmin;