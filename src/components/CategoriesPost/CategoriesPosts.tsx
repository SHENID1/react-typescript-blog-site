import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import PostApi from "../../api/postApi";
import {Button, Skeleton} from "antd";
import CategoriesApi from "../../api/categoriesApi";
import IPost from "../../models/IPost";
import cl from "./style.module.css"
import {RollbackOutlined} from "@ant-design/icons";
import PreviewPost from "./PreviewPost";

const CategoriesPosts = () => {
    const {id} = useParams();
    const [name, setName] = useState<string>("");
    const [data, setData] = useState<IPost[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    useEffect(() => {
        if (!id) return;
        if (id === "all") {
            PostApi.getPostsByCategoryId(id).then((data) => {
                setData(data);
                setLoading(false);
                setName("ВСЕ")
                return;
            })
        } else {
            PostApi.getPostsByCategoryId(id).then((data) => {
                setData(data);
                setLoading(false);
            })
            CategoriesApi.getCatById(id).then((data) => {
                setName(data.name);
            })
        }

    }, [id]);

    if (loading) return <><h1>Статьи</h1><Skeleton active/></>
    return (
        <div>
            <h1>Посты для категории {name}</h1>
            <NavLink to={`/admin/posts/`}>
                <Button icon={<RollbackOutlined/>}>Вернуться назад</Button>
            </NavLink>
            <div className={cl.createLink}>
                <NavLink to={"/admin/posts/create"}>
                    <Button type="link">
                        Написать статью
                    </Button>
                </NavLink>
            </div>
            {data.length === 0 ? <h2>Постов не найдено</h2> : <></>}
            <div className={cl.cont}>

                {data.map((item) => <PreviewPost data={item} name={name} key={item._id}/>)}
                {/*    {data?.map((item) =>*/}
                {/*    <NavLink to={`/admin/posts/${item._id}`} key={item._id}>*/}
                {/*        <div className={cl.element}>*/}
                {/*            <div>{item.title}</div>*/}
                {/*            <div>{item.isVisible ? "Доступен для всех" : "Доступен только админам"}</div>*/}
                {/*            <div>Открыть <RightOutlined/></div>*/}
                {/*        </div>*/}
                {/*    </NavLink>*/}
                {/*)}*/}
            </div>

        </div>
    );
};

export default CategoriesPosts;