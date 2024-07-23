import React, {useEffect, useState} from 'react';
import cl from "./style.module.css"
import {NavLink} from "react-router-dom";
import IOtherInfo from "../../models/IOtherInfo";
import OtherInfoApi from "../../api/otherInfoApi";
import RenderText from "../RenderTextComponents/RenderText";

const Footer = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [data, setData] = useState<IOtherInfo | undefined>(undefined);
    useEffect(() => {
        OtherInfoApi.getOtherInfoByName("footer").then((data) => {
            setData(data);
            setLoading(false);
        }).catch()
    }, []);
    return (
        <div className={cl.footer}>
            <div className={cl.linkCont}>
                <NavLink to={`/`} className={cl.link}>Главная страница</NavLink>
                <NavLink to={"/contacts"} className={cl.link}>Контакты</NavLink>
                <NavLink to={"/about"} className={cl.link}>О себе</NavLink>
                <NavLink to={"/subscribe"} className={cl.link}>Подписаться на рассылку</NavLink>
                <NavLink to={"/privacy"} className={cl.link}>Политика конфидециальности</NavLink>
            </div>
            {loading ? <div className={cl.textCont}>
                © ВСЕ ЗАКУПКИ, 2024<br/>
                Все права защищены

            </div> : <RenderText content={data?.content}/>}

        </div>
    );
};

export default Footer;