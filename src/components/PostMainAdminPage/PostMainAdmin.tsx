import React, {FC, useEffect} from 'react';
import {Button, ConfigProvider, Skeleton} from "antd";
import {NavLink} from "react-router-dom";
import cl from "./style.module.css";
import Categories from "../../models/categories";
import CategoriesApi from "../../api/categoriesApi";


const PostMainAdmin: FC = () => {
    const [categories, setCategories] = React.useState<Categories[]>([])
    const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        CategoriesApi.getAllCategories().then((data) => {
            setCategories(data);
            setLoading(false)
        }).catch()
    }, []);
    // if (loading) return <><h1>Статьи</h1><Skeleton active/></>
    return (
        <div>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            /* here is your component tokens */
                        },
                    },
                }}
            >
                <h1>Статьи</h1>
                <br/>
                <div className={cl.createLink}>
                    <NavLink to={"/admin/posts/create"}>
                        <Button type="link">
                            Написать статью
                        </Button>
                    </NavLink>
                </div>
                {loading ? <Skeleton active/> : null}
                <div>
                    {categories?.map((category) => <NavLink to={`/admin/categories/categoryPosts/${category._id}`}
                                                           key={category._id}>
                        <div className={cl.item}>
                            <span className={cl.mr}>{category.name}</span>
                            <span className={cl.mr}>{category.count} </span>
                            <Button loading={loading}>Показать посты</Button>
                        </div>
                    </NavLink>)}
                </div>
            </ConfigProvider>

        </div>
    );
};

export default PostMainAdmin;