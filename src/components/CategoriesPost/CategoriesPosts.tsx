import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import PostApi from "../../api/postApi";
import {Skeleton} from "antd";
import CategoriesApi from "../../api/categoriesApi";
import IPost from "../../models/IPost";
import cl from "./style.module.css"
import {RightOutlined} from "@ant-design/icons";

const CategoriesPosts = () => {
    const {id} = useParams();
    const [name, setName] = useState<string>("");
    const [data, setData] = useState<IPost[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    useEffect(() => {
        if (!id) return;
        PostApi.getPostsByCategoryId(id).then((data) => {
            setData(data);
            setLoading(false);
        })
        CategoriesApi.getNameById(id).then((data) => {
            setName(data);
        })
    }, [id]);

    if (loading) return <><h1>Статьи</h1><Skeleton active/></>

    return (
        <div>
            <h1>Посты для категории {name}</h1>
            {data?.map((item) =>
                <NavLink to={`/admin/posts/${item._id}`} key={item._id}>
                    <div className={cl.element}>
                        <div> {item.title} </div>
                        <div>{item.isVisible ? "Доступен для всех" : "Доступен только админам"}</div>
                        <div>Открыть <RightOutlined/></div>
                    </div>
                </NavLink>
            )}
        </div>
    );
};

export default CategoriesPosts;