import React, {FC, useEffect, useRef, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import IPost from "../../models/IPost";
import PostApi from "../../api/postApi";
import {Breadcrumb, Button, Skeleton} from "antd";
import PreviewPost from "./PreviewPost";
import cl from "./style.module.css"
import CategoriesApi from "../../api/categoriesApi";
import {MoreOutlined} from "@ant-design/icons";
import {Helmet} from "react-helmet";

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
    const [loadingMoreButton, setLoadingMoreButton] = React.useState<boolean>(false);
    const [data, setData] = React.useState<IPost[]>([])
    const [count, setCount] = useState<number>(0);
    const [isEnded, setIsEnded] = React.useState<boolean>(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const prevId = useRef<string>();
    const prevCount = useRef<number>();


    useEffect(() => {
        if (!id) return;
        if (id !== prevId.current) {
            setData([]);
            setIsEnded(false);
            setCount(0);
            setLoading(true);
        }

        PostApi.getFreePostsByCategoryId(id, count).then((data) => {
            data.sort((a1, a2) => {
                if (!a1.dateCreated || !a2.dateCreated) return -1;
                if (a1.dateCreated < a2.dateCreated) return 1;
                if (a1.dateCreated > a2.dateCreated) return -1;
                return 0
            })
            setData(prev => [...prev, ...data]);
            if (data.length < 10) setIsEnded(true);
            setLoading(false);
            setLoadingMoreButton(false);
        }).catch()
        CategoriesApi.getCatById(id).then((data) => {
            setName(data.name)
        })
        prevId.current = id;
        prevCount.current = count

    }, [count, id]);

    const handlerClickLoadMore = () => {
        setLoadingMoreButton(true);
        setLoading(true);
        setCount(prev => prev + 10);
    }

    if (!id) return null;
    return (
        <div className={cl.container}>
            <Helmet>
                <title>Все Закупки - {name === "ВСЕ" ? `Все статьи` : `Статьи для категории ${name}`}</title>
                <meta name="Статьи"
                      content="Статьи по категориям"/>
            </Helmet>
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
            <h1>{name === "ВСЕ" ? `Все статьи` : `Статьи для категории ${name}`}</h1>

            {data.map((item) => <PreviewPost data={item} name={name} key={item._id}/>)}
            {loading ? <Skeleton active/> : null}
            {!isEnded && !loading ?
                <Button icon={<MoreOutlined/>} className={cl.moreButton} size={"large"} loading={loadingMoreButton}
                        onClick={handlerClickLoadMore}>Загрузить еще..</Button> : null}

        </div>
    );
};

export default CategoryPosts;