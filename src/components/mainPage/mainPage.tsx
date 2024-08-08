import React from 'react';
import CategoryPosts from "../CategoryPostsForUsers/CategoryPosts";
import {Helmet} from "react-helmet";


const MainPage = () => {
    return (
        <div>
            <Helmet>
                <title>Все Закупки</title>
                <meta name="description"
                      content="Все статьи"/>
            </Helmet>

            <CategoryPosts propsId={"all"}/>
        </div>
    );
};

export default MainPage;