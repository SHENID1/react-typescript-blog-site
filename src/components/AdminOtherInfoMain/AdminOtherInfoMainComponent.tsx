import React from 'react';
import cl from "./style.module.css"
import {NavLink} from "react-router-dom";

const AdminOtherInfoMainComponent = () => {
    return (
        <div>
            <h1>Остальная информация</h1>
            <div className={cl.cont}>
                <NavLink to={"/admin/otherInfo/contacts"}>
                    <div className={cl.pr}>
                        Контакты
                    </div>
                </NavLink>
                <NavLink to={"/admin/otherInfo/about"}>
                    <div className={cl.pr}>
                        О себе
                    </div>
                </NavLink>
                <NavLink to={"/admin/otherInfo/privacy"}>
                    <div className={cl.pr}>
                        Политика Конфедициальности
                    </div>
                </NavLink>
                <NavLink to={"/admin/otherInfo/footer"}>
                    <div className={cl.pr}>
                        Футер
                    </div>
                </NavLink>

            </div>
        </div>
    );
};

export default AdminOtherInfoMainComponent;