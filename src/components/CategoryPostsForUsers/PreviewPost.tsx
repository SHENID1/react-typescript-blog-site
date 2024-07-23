import React, {FC} from 'react';
import IPost from "../../models/IPost";
import cl from "./style.module.css";
import {NavLink} from "react-router-dom";
import {ApiUrl} from "../../api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DOMPurify from "dompurify";
import HtmlService from "../../services/HtmlService";


dayjs.extend(relativeTime);

interface Props {
    data: IPost;
    name: string;
}



const PreviewPost: FC<Props> = ({data, name}) => {

    const date = dayjs(data?.dateCreated).locale("ru");
    const dateSting = date.format("DD.MM.YYYY");
    // console.log(data)

    const sanitizedHtmlContent = DOMPurify.sanitize(data.content[0].slice(9), {USE_PROFILES: {html: true}});
    const content = HtmlService.extractContent(sanitizedHtmlContent, true)

    return (
        <NavLink to={`/post/${data._id}`} className={cl.link}>

            <div className={cl.previewCont} style={{backgroundImage: `url(${ApiUrl}/${data.urlPreview})`}}>

                <div className={cl.image} style={{backgroundImage: `url(${ApiUrl}/${data.urlPreview})`}}/>
                <div className={cl.other}>
                    <div className={cl.info0}>
                        <div className={cl.name}>{data.title}</div>
                        <div className={cl.data}>{dateSting} - {date.fromNow()}</div>
                        <div className={cl.data}>{name}</div>
                    </div>
                    <div className={cl.textContentMessage}>
                        {content}
                    </div>

                </div>

            </div>
        </NavLink>
    );
};

export default PreviewPost;