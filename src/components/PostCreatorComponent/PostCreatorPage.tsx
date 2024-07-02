import React, {useEffect, useState} from 'react';
import cl from "./style.module.css";
import {
    Input,
    Select,
    Upload,
    Form,
    Skeleton,
    message, Button
} from "antd";
import {UploadOutlined} from "@ant-design/icons";

import Categories from "../../models/categories";
import CategoriesApi from "../../api/categoriesApi";
import type {GetProp, UploadProps} from 'antd';
import {ApiUrl} from "../../api";
import ImageApi from "../../api/imageApi";
import ModifiedTextEditorComponent from "../ModifiedTextEditor/ModifiedTextEditorComponent";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


const PostCreatorPage = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [, setFileName] = useState<string | null>(null);

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const [categories, setCategories] = React.useState<Categories[]>([])
    useEffect(() => {
        CategoriesApi.getAllCategories().then((data) => {
            setCategories(data);
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

    if (loading) return <Skeleton active/>
    return (
        <div>
            <h1>Создание Статьи</h1>
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                style={{minWidth: "max-content", width: 1000}}
            >

                <Form.Item label="Заголовок">
                    <Input/>
                </Form.Item>
                <Form.Item label="Категория">
                    <Select>
                        {categories.map((item: Categories) => <Select.Option value={item._id}
                                                                             key={item._id}>{item.name}</Select.Option>)}
                    </Select>
                </Form.Item>


                <Form.Item label="Превью фото" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined/>}>Загрузить</Button>
                    </Upload>
                </Form.Item>
                <ModifiedTextEditorComponent/>
                <br/>
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
// commentaries: IComment[];
// dateCreated: Date;