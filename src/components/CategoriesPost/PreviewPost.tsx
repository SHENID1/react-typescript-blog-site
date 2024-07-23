import React, {FC} from 'react';
import IPost from "../../models/IPost";
import cl from "./style.module.css";
import {NavLink} from "react-router-dom";
import {ApiUrl} from "../../api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface Props {
    data: IPost;
    name: string;
}

const PreviewPost: FC<Props> = ({data, name}) => {

    const date = dayjs(data?.dateCreated).locale("ru");
    const dateSting = date.format("DD.MM.YYYY");
    return (
        <NavLink to={`/admin/posts/${data._id}`} className={cl.link}>

            <div className={cl.previewCont} style={
                data.isVisible ? {
                    border: "3px SOLID lightgreen",
                    backgroundImage: `url(${ApiUrl}/${data.urlPreview})`
                } : {border: "3px SOLID red",
                    backgroundImage: `url(${ApiUrl}/${data.urlPreview})`}}
            >

                <div className={cl.image} style={{backgroundImage: `url(${ApiUrl}/${data.urlPreview})`}}/>
                <div className={cl.other}>
                    <div className={cl.name}>{data.title}</div>
                    <div className={cl.data}>{dateSting} - {date.fromNow()}</div>
                    <div className={cl.data}>{name}</div>
                    <div className={cl.data}>{data.isVisible ? "Доступен для всех" : "Доступен только админам"}</div>
                </div>
            </div>
        </NavLink>
    );
};

export default PreviewPost;