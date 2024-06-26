import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {Layout, Menu, ConfigProvider, Drawer, Button, Space} from "antd";
import {EllipsisOutlined, JavaScriptOutlined, MenuOutlined} from "@ant-design/icons";
import Footer from "../FooterComponent/Footer";
import cl from "./style.module.css";


const NavOption = [
    {key: "1", label: (<Link to="/">Главная</Link>)},
    {key: "2", label: (<Link to="postd" className={cl.cw}>Статьи</Link>), children: [{
                type: 'group',
            label: <span className={cl.cw}>Категории:</span>,
                children: [
                    { label: <Link to="postd" className={cl.cb}>Новости</Link>, key: 'setting:1' },
                    { label: <Link to="postd" className={cl.cb}>что то еще</Link>, key: 'setting:2' },
                    { label: <Link to="postd" className={cl.cb}>тема 3</Link>, key: 'setting:3' },
                    { label: <Link to="postd" className={cl.cb}>тема 4</Link>, key: 'setting:4' },
                    { label: <Link to="postd" className={cl.cb}>тема 5</Link>, key: 'setting:5' },
                    // eslint-disable-next-line react/jsx-no-undef
                    { label: <Link to="postd" className={cl.cb}>Еще...</Link>, key: 'setting:6', icon:<EllipsisOutlined /> },
                ],},],},
    {key: "3", label: (<Link to="contacts">Контакты</Link>)},
    {key: "4", label: (<Link to="self">О себе</Link>)},
    {key: "5", label: (<Link to="subscribe">Подписка на новости</Link>)},
    // {key: 5, label: (<Link to="event">События</Link>)},
]

const MyLayout = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    const handleOpenBurgerMenu = () => setOpen(!open);
    const onClose = () => setOpen(false);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        darkItemSelectedBg: "rgba(18,44,37,0)",
                        itemSelectedBg: "rgba(2,51,35,0)",
                        darkItemBg: "#2b6554",
                        itemBg: "rgba(43,101,84,0)",
                        borderRadius: 10,
                        horizontalItemSelectedColor: "rgb(23,246,195)",
                        colorBgElevated: "#38876e",
                        colorText: "rgb(255,255,255)",
                    },
                    Layout: {
                        headerBg: "#38876e",
                        headerPadding: 0,
                    }
                },
            }}
        >


            <Layout className={cl.mainL}>
                <Layout.Header>
                    <div className={cl.cont}>
                        <div className={cl.logoCont}>
                            <JavaScriptOutlined className={cl.logo}/>
                        </div>

                        <div className={cl.name}>
                            Все Закупки
                        </div>
                        <Menu theme="light"
                              mode="horizontal"
                              defaultSelectedKeys={["1"]}
                              items={NavOption}
                              style={{borderRadius: "5px", width: "500px"}}
                              className={cl.menuHorizontal}
                        />
                        <MenuOutlined onClick={handleOpenBurgerMenu} className={cl.MenuOutlined}/>
                        <Drawer open={open}
                                size={"large"}
                                placement={"left"}
                                onClose={onClose}
                                extra={
                                    <Space>
                                        Все Закупки
                                    </Space>}
                        />
                    </div>
                </Layout.Header>
                <Outlet/>
                <Footer/>
            </Layout>
        </ConfigProvider>
    );
};

export default MyLayout;