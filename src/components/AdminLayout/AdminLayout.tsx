import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {Layout, Menu, ConfigProvider, Drawer, Space, Button} from "antd";
import {JavaScriptOutlined, MenuOutlined} from "@ant-design/icons";
import Footer from "../FooterComponent/Footer";
import cl from "./style.module.css";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import AuthService from "../../services/AuthService";
import {userSlice} from "../../store/reducers/UserSlice";


const NavOption = [
    {key: "1", label: (<Link to="/">Главная</Link>)},
    {key: "2", label: (<Link to="postd" className={cl.cw}>Статьи</Link>)},
    {key: "3", label: (<Link to="contacts">Контакты</Link>)},
    {key: "4", label: (<Link to="self">О себе</Link>)},
    {key: "5", label: (<Link to="subscribe">Подписка на новости</Link>)},
    // {key: 5, label: (<Link to="event">События</Link>)},
]

const AdminLayout: React.FC = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const {user} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()
    const {logout} = userSlice.actions;
    const handleOpenBurgerMenu = () => setOpen(!open);
    const onClose = () => setOpen(false);
    const logout_handler = () => {
        AuthService.logout_handler(dispatch, logout).then()
    }


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
                    },
                    Drawer: {
                        colorBgElevated: "#2b6554",
                    },
                    Button: {
                        defaultHoverBorderColor: "rgb(23,246,195)",
                        defaultHoverColor: "rgb(0,45,38)",
                    },
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
                                size={"default"}
                                placement={"left"}
                                onClose={onClose}
                                extra={
                                    <Space>
                                        <span>{user?.username}</span>
                                        <Button onClick={logout_handler} className={cl.btn}>Выйти</Button>
                                    </Space>}
                        >

                            <Menu theme="light"
                              mode="inline"
                              defaultSelectedKeys={["1"]}
                              items={NavOption}
                              style={{borderRadius: "5px", width: "100%"}}
                              className={cl.menuVertical}
                        />
                        </Drawer>
                        <div className={cl.user}>
                            <span className={cl.sp}>Добро пожаловать, {user?.username}</span>
                            <Button onClick={logout_handler} className={cl.btn}>Выйти</Button>
                        </div>
                    </div>
                </Layout.Header>
                <Outlet/>
                <Footer/>
            </Layout>
        </ConfigProvider>
    );
};

export default AdminLayout;