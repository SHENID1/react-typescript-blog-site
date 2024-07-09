import React from 'react';
import CategoryPosts from "../CategoryPostsForUsers/CategoryPosts";
import {Breadcrumb} from "antd";

const MainPage = () => {
    return (
        <div>
            <Breadcrumb
                items={[
                    {
                        title: 'Главная',
                    },
                ]}
            />


            <CategoryPosts propsId={"all"}/>
        </div>
    );
};

export default MainPage;