import React from 'react';
import {useAppSelector} from "../../hooks/redux";



const MainAdmin = () => {
    const {user} = useAppSelector(state => state.authReducer)



    return (
        <div>
            <h1>Главная</h1><br/>
            Ваше имя: {user?.username}<br/>
            Ваши роли: {user?.roles.join(", ")}.<br/>
        </div>
    );
};

export default MainAdmin;