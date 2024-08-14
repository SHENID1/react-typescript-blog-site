import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../hooks/redux";
import {ClearOutlined} from "@ant-design/icons";
import {Button} from "antd";
import PostApi from "../../api/postApi";
import MailerApi from "../../api/mailApi";
import {ApiUrl} from "../../api";

interface Response {
    email: string;
    _id: string;
}

const MainAdmin = () => {
    const {user} = useAppSelector(state => state.authReducer)
    const [bytes, setBytes] = useState<number>(0)
    const [countUsers, setCountUsers] = React.useState<number>(0);
    const [userList, setUserList] = React.useState<Response[]>([]);

    useEffect(() => {
        PostApi.getBytes().then(setBytes).catch(() => alert("Сбой в загрузке"))
        MailerApi.getUsers().then((data) => {
            setCountUsers(data.Count);
            setUserList(data.mailList);
        }).catch(err => alert(err));
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
            <h2>Кол-во оформленных подписку - {countUsers}</h2>
            <div>
                {userList.map((item, index) => (<div key={item._id}>
                    <b>{index + 1}.</b> <span>{item.email}</span> <a href={ApiUrl + "/mail/remove/" + item._id}>Ссылка для
                    отписки</a>
                </div>))}
            </div>
        </div>
    );
};

export default MainAdmin;