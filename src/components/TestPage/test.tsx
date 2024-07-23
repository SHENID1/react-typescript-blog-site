import React, {FC, useEffect, useState} from "react";
import {ApiUrl} from "../../api";
// import cl from "./style.module.css"
import CategoriesApi from "../../api/categoriesApi";
import dayjs from "dayjs";
import "./style.css"


export const TestPage: FC = () => {
    const [name, setName] = useState<string>("");
    const data = {
        "_id": "66879c01c39de6c73576be5e",
        "title": "Спорт как стиль жизни: мотивация, здоровье и успех",
        "urlPreview": "76a0cfff-d8e0-4071-817e-f59b949d9427.jpg",
        "isVisible": true,
        "content": [],
        "commentaries": [],
        "categories": "66879a55c39de6c73576be5a",
        "dateCreated": "2024-07-05T06:39:03.377Z",
        "__v": 0
    }
    useEffect(() => {
        CategoriesApi.getCatById(data.categories).then((r) => setName(r.name))
    }, [data.categories]);
    const date = dayjs(data?.dateCreated).locale("ru");
    const dateSting = date.format("DD.MM.YYYY");
    return (
        <section>
            <div className="cont">
                <div className="cc">
                    <div className="header">
                        <div className="nn">
                            Все Закупки
                        </div>
                    </div>
                    <a href={`${window.location.origin}/post/${data._id}`} target="_blank"
                       rel="noopener noreferrer" style={{cursor: "pointer", all: "unset"}} className="link">
                        <div className="previewCont" style={{backgroundImage: `url(${ApiUrl}/${data.urlPreview})`}}>
                        </div>
                        <div className="other">
                            <div className="name">{data.title}</div>
                            <div className="data">Категория: <b>{name}</b></div>
                            <div className="data"><b>{dateSting}</b></div>

                        </div>
                    </a>
                    <div className="footer">
                        Если вы не хотите получать подобные информационные сообщения в будущем, нажмите <a
                        href={`${window.location.origin}/post/${data._id}`}>здесь</a>.
                    </div>
                </div>
            </div>

        </section>
    );
};


/*
1. категории только на вкладке статья
2. кнопка загрузить еще мна главной стар и везде
3. предварительный просмотри для панели администратора
баг со временем исправить
 */