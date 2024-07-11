import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import MainPage from "./components/mainPage/mainPage";
import Page404 from "./components/Page404/Page404";
import MyLayout from "./components/layoutComponent/Layout";
import AdminRouter from "./components/AdminPanel/AdminRouter";
import CategoryPosts from "./components/CategoryPostsForUsers/CategoryPosts";
import ContactsPageComponent from "./components/ContactsPage/ContactsPageComponent";
import AboutPageComponent from "./components/AboutPage/AboutPageComponent";
import SubscribePageComponent from "./components/SubscribePage/SubscribePageComponent";
import PostReaderComponent from "./components/PostReaderPage/PostReaderComponent";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage/PrivacyPolicyPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin/*" element={<AdminRouter/>}/>
                <Route path="/" element={<MyLayout/>}>
                    <Route path={"/"} element={<MainPage/>}/>
                    <Route path={"/post/:id"} element={<PostReaderComponent/>}/>
                    <Route path={"/categories/:id"} element={<CategoryPosts/>}/>
                    <Route path={"/contacts"} element={<ContactsPageComponent/>}/>
                    <Route path={"/about"} element={<AboutPageComponent/>}/>
                    <Route path={"/subscribe"} element={<SubscribePageComponent/>}/>
                    <Route path={"/privacy"} element={<PrivacyPolicyPage/>}/>
                    <Route path={"*"} element={<Page404/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
