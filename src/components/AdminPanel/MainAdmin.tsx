import React from 'react';
import {useAppSelector} from "../../hooks/redux";



const MainAdmin = () => {
    const {user} = useAppSelector(state => state.authReducer)



    return (
        <div>
            text<br/>
            {user?.username}
        </div>
    );
};

export default MainAdmin;