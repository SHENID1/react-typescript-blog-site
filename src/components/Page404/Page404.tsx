import React from 'react';
import {NavLink} from 'react-router-dom';
import cl from "./style.module.css"
import MetaComponent from "../../seo/metaComponent";

const Page404 = () => {
    return (
        <div className={cl.cont}>
            <MetaComponent title={"404"} description={"Не найдено"}/>

            <h1>404 <br/>Данной страницы не существует</h1>
            <NavLink to={`/`}>Главная страница</NavLink>
        </div>
    );
};

export default Page404;