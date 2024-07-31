import React, {useEffect} from 'react';
import {Link, Outlet} from "react-router-dom";
import {Layout, Menu, ConfigProvider, Drawer, Space, MenuProps} from "antd";
import {JavaScriptOutlined, MenuOutlined} from "@ant-design/icons";
import Footer from "../FooterComponent/Footer";
import cl from "./style.module.css";
import CategoriesApi from "../../api/categoriesApi";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {CategoriesSlice} from "../../store/reducers/CategoriesSlice";
import {ApiUrl} from "../../api";
import HeaderService from "../../services/HeaderService";
import {App} from 'antd';


type MenuItem = Required<MenuProps>['items'][number];


const MyLayout = () => {
        const [open, setOpen] = React.useState<boolean>(false);
        const path = window.location.pathname;
        const initialSelected = HeaderService.getHeader(path)
        const [selected, setSelected] = React.useState<string[]>(initialSelected)
        const [loading, setLoading] = React.useState<boolean>(true)

        const dispatch = useAppDispatch()
        const {CatList} = useAppSelector(state => state.categoriesReducer)
        const {setCategories} = CategoriesSlice.actions;

        const items: MenuItem[] = [
            {
                key: 'grp',
                label: 'Категории статей',
                type: 'group',
                children: [
                    loading ? {
                        label: "Идет загрузка...",
                        key: `settings:loading`,
                        disabled: true,
                    } : null,
                    ...CatList.slice(1)?.map((cat, ) => {
                        return {
                            label: <Link to={`/categories/${cat._id}`} className={cl.cb}>{cat.name}</Link>,
                            key: `settings:${cat._id}`,
                        }
                    })

                ],
            },
        ];
        const NavOption = [
            {key: "1", label: (<Link to="/">Главная</Link>)},
            {
                key: "settings:all", label: (<Link to="/categories/all" className={cl.cw}>Статьи</Link>),
            },


            {key: "3", label: (<Link to="contacts">Контакты</Link>)},
            {key: "4", label: (<Link to="about">О себе</Link>)},
            {key: "5", label: (<Link to="subscribe">Подписка на новости</Link>)},
            // {key: 5, label: (<Link to="event">События</Link>)},
        ]
        const NavOptionWithCategories = [
            {key: "1", label: (<Link to="/">Главная</Link>)},
            {
                key: "2", label: (<Link to="/categories/all" className={cl.cw}>Статьи</Link>),
                children: [{
                    type: 'group',
                    label: <span className={cl.cw}>Категории:</span>,
                    children: [
                        ...CatList?.map((cat, ) => {
                            return {
                                label: <Link to={`/categories/${cat._id}`} className={cl.cb}>{cat.name}</Link>,
                                key: `settings:${cat._id}`,
                            }
                        }),

                    ],
                },],
            },

            {key: "3", label: (<Link to="contacts">Контакты</Link>)},
            {key: "4", label: (<Link to="about">О себе</Link>)},
            {key: "5", label: (<Link to="subscribe">Подписка на новости</Link>)},
            // {key: 5, label: (<Link to="event">События</Link>)},
        ]

        const reloadCategories = async () => {
            const uri = `${ApiUrl}/api/categories`
            const newCache = await caches.open('categories');
            const res = await newCache.match(uri);
            if (!res) {
                // CategoriesApi.getAllCategories().then(r => {
                //     dispatch(setCategories(r));
                //     setLoading(false);
                // })
                return
            }
            res.json().then(data => {
                dispatch(setCategories(data));
                setLoading(false);
            });
        }
        const LoadCategory = async () => {
            // await System.storage.setItem('usersData', JSON.stringify(data));
            if ('caches' in window) {
                await reloadCategories()
                const uri = `${ApiUrl}/api/categories`
                const newCache = await caches.open('categories');
                newCache.add(uri).then(() => {
                    reloadCategories()
                })
                    .catch((error) => console.error("Error adding data to cache:", error));


            } else {
                CategoriesApi.getAllCategories().then(r => {
                    dispatch(setCategories(r));
                    setLoading(false);
                })
            }
        }

        const onChangeHandler = (props: any) => {
            setSelected(props.key);
            setOpen(false);
            window.scrollTo(0, 0);
        }
        useEffect(() => {
                LoadCategory().then()
            },
            // eslint-disable-next-line
            []
        );

        const handleOpenBurgerMenu = () => setOpen(!open);
        const onClose = () => setOpen(false);

        return (
            <App>
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                darkItemSelectedBg: "rgba(18,44,37,0)",
                                itemSelectedBg: "rgba(2,51,35,0)",
                                darkItemBg: "#38876e",
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
                            }
                        },
                    }}
                >


                    <Layout className={cl.mainL}>
                        <Layout.Header>
                            <div className={cl.cont}>
                                <Link to="/" onClick={()=>onChangeHandler({key: "1"})}>
                                    <div className={cl.LogoName}>
                                        <div className={cl.logoCont}>
                                            <JavaScriptOutlined className={cl.logo}/>
                                        </div>

                                        <div className={cl.name}>
                                            Все Закупки
                                        </div>
                                    </div>
                                </Link>
                                <Menu theme="light"
                                      mode="horizontal"
                                      items={NavOption}
                                      onClick={onChangeHandler}
                                      selectedKeys={selected}
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
                                                Все Закупки
                                            </Space>}
                                >

                                    <Menu theme="light"
                                          mode="inline"
                                          items={NavOptionWithCategories}
                                          selectedKeys={selected}
                                          onClick={onChangeHandler}
                                          style={{borderRadius: "5px", width: "100%"}}
                                          className={cl.menuVertical}
                                    />
                                </Drawer>
                            </div>
                        </Layout.Header>
                        <div className={cl.main}>
                            {path.startsWith('/categories/') ? <Menu
                                style={{width: 256,}}
                                mode="inline"
                                selectedKeys={selected}
                                onClick={onChangeHandler}
                                items={items}
                                theme={"dark"}
                                className={cl.leftMenu}
                            /> : null}

                            <div className={cl.outlet}>
                                <Outlet/>
                            </div>
                        </div>
                        <Footer/>
                    </Layout>
                </ConfigProvider>
            </App>
        );
    }
;

export default MyLayout;