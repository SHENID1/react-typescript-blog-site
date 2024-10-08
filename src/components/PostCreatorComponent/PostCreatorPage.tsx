import React, {useEffect, useState} from 'react';
import cl from "./style.module.css";
import {
    Input,
    Select,
    Upload,
    Form,
    Skeleton,
    message, Button, Switch
} from "antd";
import {RollbackOutlined, UploadOutlined} from "@ant-design/icons";

import Categories from "../../models/categories";
import CategoriesApi from "../../api/categoriesApi";
import type {GetProp, UploadProps} from 'antd';
import {ApiUrl} from "../../api";
import ImageApi from "../../api/imageApi";
import ModifiedTextEditorComponent from "../ModifiedTextEditor/ModifiedTextEditorComponent";
import PostApi from "../../api/postApi";
import IPost from "../../models/IPost";
import {NavLink} from "react-router-dom";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} нужно указать!'
};
/* eslint-enable no-template-curly-in-string */

const PostCreatorPage = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [, setFileName] = useState<string | null>(null);
    const [data, setData] = useState<string[]>(["htmlText <span></span>"]);

    // useEffect(() => {
    //     console.log(data)
    // }, [data]);

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const [categories, setCategories] = React.useState<Categories[]>([])
    useEffect(() => {
        CategoriesApi.getAllCategories().then((data) => {
            const FilteredData = data.filter((a) => a._id !== "all")
            setCategories(FilteredData);
            setLoading(false);
        }).catch()
    }, []);

    const props: UploadProps = {
        name: 'file',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        withCredentials: true,
        beforeUpload: (file: FileType) => {
            const isPNG = file.type === 'image/png';
            const isJPG = file.type === 'image/jpeg';
            if (!isPNG && !isJPG) {
                message.error(`${file.name} is not a png, jpg file`).then();
            }
            return isPNG || isJPG || Upload.LIST_IGNORE;
        },
        action: `${ApiUrl}/api/image/`,
        onChange: (info: any) => {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} файл загружен успешно`).then();
                setFileName(info.file.response);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} файл не загрузился.`).then();
            }
        },
        maxCount: 1,
        listType: "picture",
        onRemove: ImageApi.deleteImage,
    };
    const onFinish = (values: any) => {
        values.urlPreview = values.urlPreview[0].response
        values.content = data
        // console.log(values);
        PostApi.create(values).then((data: IPost) => {
            window.location.replace(`${window.location.origin}/admin/posts/${data._id}`)
        }).catch((e)=>alert(e))
    }
    const handlerData = (arr: string[]) => setData(arr);
    if (loading) return <><h1>Создание Статьи</h1><Skeleton active/></>
    return (
        <div>
            <h1>Создание Статьи</h1>
            <NavLink to={`/admin/posts/`}>
                <Button icon={<RollbackOutlined/>}>Вернуться назад</Button>
            </NavLink>
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                // style={{minWidth: "max-content", width: 1000}}
                onFinish={onFinish}
                name={"post"}
                initialValues={{isVisible: false}}
                validateMessages={validateMessages}
            >

                <Form.Item label="Заголовок" name={"title"} rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Категория" name={"categories"} rules={[{required: true}]}>
                    <Select>
                        {categories.map((item: Categories) => <Select.Option value={item._id}
                                                                             key={item._id}>{item.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Открытый доступ" valuePropName="checked" name={"isVisible"}>
                    <Switch/>
                </Form.Item>
                <Form.Item label="Превью фото" valuePropName="fileList" getValueFromEvent={normFile}
                           name={"urlPreview"} rules={[{required: true}]}>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined/>}>Загрузить</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Контент" name={"content"}>
                    <ModifiedTextEditorComponent getData={handlerData}/>
                </Form.Item>

                <div style={{color: "#ff8100", marginBottom: 15}}>Превью контента будет доступно после создания поста<br/>
                Рекомендуем не включать открытый доступ сразу
                </div>
                <Button type="primary" size="large" htmlType="submit" className={cl.submitButton}>Создать</Button>

            </Form>

        </div>
    );
};

export default PostCreatorPage;

// _id: string;
// title: string;
// categories: string;
// urlPreview: string;
// content: string[];
// isVisible: boolean;
// commentaries: IComment[];
// dateCreated: Date;