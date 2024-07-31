import React, {FC, useEffect} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {useNavigate} from "react-router";
import {Breadcrumb, Button, Skeleton} from "antd";
import IPost from "../../models/IPost";
import PostApi from "../../api/postApi";
import cl from "./style.module.css";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from 'dayjs/plugin/relativeTime';
import Page404 from "../Page404/Page404";
import {RollbackOutlined} from "@ant-design/icons";
import RenderText from "../RenderTextComponents/RenderText";
import {Helmet} from "react-helmet";
import DOMPurify from "dompurify";
import HtmlService from "../../services/HtmlService";


dayjs.extend(relativeTime);

interface State {
    root?: boolean;
}


const PostReaderComponent: FC<State> = ({root}) => {
    const {id} = useParams();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [data, setData] = React.useState<IPost | null>(null);
    const [error, setError] = React.useState<boolean>(false);
    const history = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!id) return;
        if (root) {
            PostApi.getPostById(id).then(r => {
                setData(r);
                setLoading(false);
            }).catch(() => setError(true))
        } else {
            PostApi.getFreePostById(id).then(r => {
                if (!r.categories) {
                    r.categories = {
                        name: "Не найдено",
                        _id: "-1",
                        count: 0,
                    };
                }
                setData(r);
                setLoading(false);
            }).catch(() => setError(true))
        }
    }, [id, root]);

    if (error) return <Page404/>
    if (loading) return <><Skeleton active/></>
    if (!id) return <h1>Не удалось прочитать данные</h1>
    let content: string = "";
    if (data?.content) {
        const sanitizedHtmlContent = DOMPurify.sanitize(data.content[0].slice(9), {USE_PROFILES: {html: true}});
        content = HtmlService.extractContent(sanitizedHtmlContent, true)
    }


    const date = dayjs(data?.dateCreated).locale("ru");
    const dateSting = date.format("DD.MM.YYYY");
    return (
        <div className={cl.wr}>
            <Helmet>
                <title>Все Закупки - {data?.title}</title>
                <meta name={data?.categories.name}
                      content={content}/>
            </Helmet>
            <div className={cl.cont}>
                <Breadcrumb
                    items={[
                        {
                            title: <NavLink to={`/`}>Главная</NavLink>,
                        },
                        {
                            title: <NavLink to={`/categories/all`}>Все категории</NavLink>,
                        },
                        {
                            title: <NavLink
                                to={`/categories/${data?.categories._id}`}>{data?.categories.name}</NavLink>,
                        },
                        {
                            title: data?.title,
                        },
                    ]}
                />
                <Button type="text" onClick={() => history(-1)} style={{marginTop: 15}} icon={<RollbackOutlined/>}>Вернуться
                    назад</Button>
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
                    <RenderText content={data?.content}/>
                </div>
            </div>
        </div>
    );
};

export default PostReaderComponent;