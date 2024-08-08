import React from 'react';
import CategoryPosts from "../CategoryPostsForUsers/CategoryPosts";
import MetaComponent from "../../seo/metaComponent";


const MainPage = () => {
    return (
        <div>
            <MetaComponent title={"Главная"} description={"Главная страница"}/>
            <CategoryPosts propsId={"all"}/>
        </div>
    );
};

export default MainPage;