import {useParams} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import cl from "./style.module.css";
import {
    Input,
    Select,
    Upload,
    Form,
    Skeleton,
    message, Button, Switch, DatePicker, Space
} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import dayjs from "dayjs"
import Categories from "../../models/categories";
import CategoriesApi from "../../api/categoriesApi";
import type {GetProp, UploadProps} from 'antd';
import {ApiUrl} from "../../api";
import ImageApi from "../../api/imageApi";
import ModifiedTextEditorComponent from "../ModifiedTextEditor/ModifiedTextEditorComponent";
import PostApi from "../../api/postApi";
import IPost from "../../models/IPost";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getImageData = (data: IPost) => {
    return [{
        uid: data?._id,
        name: `${data?.urlPreview}`,
        status: 'done',
        url: `${ApiUrl}/${data?.urlPreview}`,
        thumbUrl: `${ApiUrl}/${data?.urlPreview}`,
    }]
}
const PostUpdate = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [data, setData] = useState<string[]>(["htmlText <span></span>"]);
    const [initialValues, setInitialValues] = useState<IPost | null>(null);
    const {id} = useParams();
    const [categories, setCategories] = React.useState<Categories[]>([])
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Успешно обновлено',
        }).then();
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Произошла сетевая ошибка',
        }).then();
    };


    const LoadData = async () => {
        if (!id) throw new Error("id must be provided");
        const cat = await CategoriesApi.getAllCategories()
        const initV = await PostApi.getPostById(id);
        initV.urlPreview = getImageData(initV)
        initV.dateCreated = dayjs(initV.dateCreated)
        setCategories(cat);
        setInitialValues(initV)
        return true
    }


    const normFile = (e: any) => {
        console.log(e)
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    useEffect(() => {
        LoadData().then(() => {
            setLoading(false);
        }).catch()
        // eslint-disable-next-line
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
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} файл не загрузился.`).then();
            }
        },
        maxCount: 1,
        listType: "picture",
        onRemove: ImageApi.deleteImage,
    };
    const onFinish = (values: any) => {
        // console.log(values);
        values.urlPreview = values.urlPreview[0].response;
        if (!values.urlPreview) values.urlPreview = initialValues?.urlPreview[0].name;
        values.dateCreated = values.dateCreated.toDate()
        values.content = data
        // console.log(values);
        PostApi.updatePost(values).then(() => success()).catch(() => error())
    }
    const handlerData = (arr: string[]) => setData(arr);
    const handlerDelete = () => {
        if (!id) return
        PostApi.DeletePost(id).then(() => {
            window.location.replace(`${window.location.origin}/admin/posts/`)

        }).catch(() => error())
    }
    if (loading) return <Skeleton active/>
    return (
        <div>
            {contextHolder}
            <h1>Обновить информацию о статье</h1>
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                style={{minWidth: "max-content", width: 1000}}
                onFinish={onFinish}
                name={"post"}
                initialValues={initialValues ? initialValues : undefined}
            >
                <Form.Item label="ID" name={"_id"} rules={[{required: true}]}>
                    <Input disabled={true}/>
                </Form.Item>
                <Form.Item label="Заголовок" name={"title"} rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Категория" name={"categories"} rules={[{required: true}]}>
                    <Select>
                        {categories.map((item: Categories) => <Select.Option value={item._id}
                                                                             key={item._id}>{item.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name={'dateCreated'} label={"Дата создания"} rules={[{required: true}]}>
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" disabled={true}/>
                </Form.Item>
                <Form.Item label="Открытый доступ" valuePropName="checked" name={"isVisible"}
                           rules={[{required: true}]}>
                    <Switch/>
                </Form.Item>
                <Form.Item label="Превью фото" valuePropName="fileList" getValueFromEvent={normFile}
                           name={"urlPreview"} rules={[{required: true}]}>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined/>}>Загрузить</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Контент" name={"content"} rules={[{required: true}]}>
                    <ModifiedTextEditorComponent getData={handlerData} initialContent={initialValues?.content}/>
                </Form.Item>

                <br/>
                <Space>
                    <Button type="primary" size="large" htmlType="submit" className={cl.submitButton}>Сохранить</Button>
                    <Button type="primary" size="large" danger className={cl.submitButton}
                            onClick={handlerDelete}>Удалить</Button>
                </Space>

            </Form>

        </div>
    );
};
export default PostUpdate;
