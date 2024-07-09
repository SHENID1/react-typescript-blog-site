import React, {useEffect} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {Breadcrumb, Skeleton} from "antd";
import IPost from "../../models/IPost";
import PostApi from "../../api/postApi";
import cl from "./style.module.css";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from 'dayjs/plugin/relativeTime';
import Page404 from "../Page404/Page404";
import DOMPurify from 'dompurify';
import ImageViewer from "./ImageViewer";


dayjs.extend(relativeTime);

const PostReaderComponent = () => {
    const {id} = useParams();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [data, setData] = React.useState<IPost | null>(null);
    const [error, setError] = React.useState<boolean>(false);

    useEffect(() => {
        if (!id) return;
        PostApi.getFreePostById(id).then(r => {
            setData(r);
            setLoading(false);
        }).catch(() => setError(true))
    }, [id]);

    if (error) return <Page404/>
    if (loading) return <><Skeleton active/></>
    if (!id) return <h1>Не удалось прочитать данные</h1>


    const date = dayjs(data?.dateCreated).locale("ru");
    const dateSting = date.format("DD.MM.YYYY");
    // console.log(data?.content);
    return (
        <div className={cl.cont}>
            <Breadcrumb
                items={[
                    {
                        title: <NavLink to={`/`} >Главная</NavLink>,
                    },
                    {
                        title: <NavLink to={`/categories/all`} >Все категории</NavLink>,
                    },
                    {
                        title: <NavLink to={`/categories/${data?.categories._id}`} >{data?.categories.name}</NavLink>,
                    },
                    {
                        title: data?.title,
                    },
                ]}
            />
            <h2>{data?.title}</h2>
            <div className={cl.date}>
                <div className={cl.tdate}>
                    {dateSting} - {date.fromNow()}
                </div>
            </div>
            <div className={cl.date}>
                <div className={cl.tdate}>
                    Категория: {data?.categories.name}
                </div>
            </div>

            <div className={cl.content}>
                {data?.content.map((item) => {
                    const contentSplit = item.split(" ");
                    const sanitizedHtmlContent = DOMPurify.sanitize(item.slice(9), {USE_PROFILES: {html: true}});
                    if (contentSplit[0] === "htmlText") return <div key={contentSplit[1]}
                                                                    dangerouslySetInnerHTML={{__html: sanitizedHtmlContent}}></div>;
                    return <ImageViewer name={contentSplit[1]} key={contentSplit[1]}/>;
                })}
            </div>
        </div>
    );
};

export default PostReaderComponent;