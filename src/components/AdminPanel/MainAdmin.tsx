import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../hooks/redux";
import {ClearOutlined} from "@ant-design/icons";
import {Button} from "antd";
import PostApi from "../../api/postApi";


const MainAdmin = () => {
    const {user} = useAppSelector(state => state.authReducer)
    const [bytes, setBytes] = useState<number>(0)
    useEffect(() => {
        PostApi.getBytes().then(setBytes).catch(() => alert("Сбой в загрузке"))
    }, []);
    const onclick = () => PostApi.clearBytes().then(() => {
        PostApi.getBytes().then(setBytes).catch(() => alert("Сбой в загрузке"))
    })

    const bytesRounded = Math.round(bytes * 100) / 100


    return (
        <div>
            <h1>Главная</h1><br/>
            <Button icon={<ClearOutlined/>} type="text" onClick={onclick}>Очистить неиспользуемые изображения (Общий
                вес {bytesRounded} МБ)</Button><br/>
            Ваше имя: {user?.username}<br/>
            Ваши роли: {user?.roles.join(", ")}.<br/>
        </div>
    );
};

export default MainAdmin;