import React, {FC} from 'react';
import IPost from "../../models/IPost";
import cl from "./style.module.css";
import {NavLink} from "react-router-dom";
import {ApiUrl} from "../../api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {RightOutlined} from "@ant-design/icons";

dayjs.extend(relativeTime);

interface Props {
    data: IPost;
    name: string;
}

const PreviewPost: FC<Props> = ({data, name}) => {

    const date = dayjs(data?.dateCreated).locale("ru");
    const dateSting = date.format("DD.MM.YYYY");
    return (
        <NavLink to={`/post/${data._id}`} className={cl.link}>

            <div className={cl.previewCont} style={{backgroundImage: `url(${ApiUrl}/${data.urlPreview})`}}>

                <div className={cl.image} style={{backgroundImage: `url(${ApiUrl}/${data.urlPreview})`}}/>
                <div className={cl.other}>
                    <div className={cl.name}>{data.title}</div>
                    <div className={cl.data}>{dateSting} - {date.fromNow()}</div>
                    <div className={cl.data}>{name}</div>
                </div>
                {/*<div className={cl.open}>*/}
                {/*    <div className={cl.openSpan}>*/}
                {/*        <span>Открыть <RightOutlined style={{paddingTop: 1}}/></span>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </NavLink>
    );
};

export default PreviewPost;