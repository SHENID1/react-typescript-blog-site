import React, {FC, useEffect} from 'react';
import {NavLink, useParams} from "react-router-dom";
import IPost from "../../models/IPost";
import PostApi from "../../api/postApi";
import {Breadcrumb, Skeleton} from "antd";
import PreviewPost from "./PreviewPost";
import cl from "./style.module.css"
import CategoriesApi from "../../api/categoriesApi";

interface Props {
    propsId?: string;
}

const CategoryPosts: FC<Props> = ({propsId}) => {
    let {id} = useParams();
    if (propsId) {
        id = propsId;
    }
    const [name, setName] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(true);
    const [data, setData] = React.useState<IPost[]>([])

    useEffect(() => {
        if (!id) return;
        PostApi.getFreePostsByCategoryId(id).then((data) => {
            data.sort((a1, a2) => {
                if (!a1.dateCreated || !a2.dateCreated) return -1;
                if (a1.dateCreated < a2.dateCreated) return 1;
                if (a1.dateCreated > a2.dateCreated) return -1;
                return 0
            })
            setData(data);
            setLoading(false);
        }).catch()
        CategoriesApi.getCatById(id).then((data) => {
            setName(data.name)
        })
    }, [id]);

    if (loading || !id) return <Skeleton active/>
    return (
        <div className={cl.container}>
            {!propsId ? <Breadcrumb
                items={[
                    {
                        title: <NavLink to={`/`}>Главная</NavLink>,
                    },
                    {
                        title: <NavLink to={`/categories/all`}>Категории</NavLink>,
                    },
                    {
                        title: name,
                    },
                ]}
            /> : null}

            <h1>{name === "ВСЕ" ? `Все посты` : `Посты для категории ${name}`}</h1>
            {data.map((item) => <PreviewPost data={item} name={name} key={item._id}/>)}
        </div>
    );
};

export default CategoryPosts;