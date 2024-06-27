import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import MainPage from "./components/mainPage/mainPage";
import Page404 from "./components/Page404/Page404";
import MyLayout from "./components/layoutComponent/Layout";
import MainAdmin from "./components/AdminPanel/MainAdmin";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MyLayout/>}>
                    <Route path="/admin/*" element={<MainAdmin/>}/>
                    <Route path={"/"} element={<MainPage/>}/>
                    <Route path={"*"} element={<Page404/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
